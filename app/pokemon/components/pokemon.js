'use client';
import { useEffect, useState } from 'react';

import { getAllPokemons, getPokemonDetail } from '../../lb/data/pokemonAPI';
import PokemonDetail from '../../components/pokemonDetail';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

const NUMBER_OF_POKEMON_AVATARS = 20;
let numberOfAvatarsToRender = [];

export default function Pokemon() {
    const [allPokemons, setAllPokemons] = useState([]);
    const [getPokemonsLoadingLimit, setGetPokemonsLoadingLimit] = useState(150);
    const [getPokemonsOffset, setGetPokemonsOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [pokemonInfo, setPokemonInfo] = useState({});

    useEffect(() => {
        async function fetchPokemons() {
            const data = await getAllPokemons(
                getPokemonsLoadingLimit,
                getPokemonsOffset
            );
            const promises = data.map(async (pokemon) => {
                const details = await getPokemonDetail(pokemon.name);
                return {
                    name:
                        pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1),
                    image: details.sprites?.front_default,
                };
            });

            const pokemonNames = await Promise.all(promises);
            setAllPokemons(pokemonNames);
            numberOfAvatarsToRender = randomNumberOfPokemonsToRender(
                getPokemonsOffset,
                getPokemonsLoadingLimit,
                NUMBER_OF_POKEMON_AVATARS
            );
            setGetPokemonsLoadingLimit(300);
            setGetPokemonsOffset(150);
            return numberOfAvatarsToRender;
        }

        fetchPokemons();
    }, []);

    useEffect(() => {
        async function fetchPokemonDetail() {
            // Check if selectedPokemon is not an empty object
            if (Object.keys(selectedPokemon).length !== 0) {
                const data = await getPokemonDetail(
                    selectedPokemon.name.toLowerCase()
                );
                console.log(data);
                setPokemonInfo({
                    name: data.name,
                    weight: data.weight,
                    height: data.height,
                    abilities: data.abilities,
                    image: data.sprites?.front_default,
                });
            }
        }

        fetchPokemonDetail();
    }, [selectedPokemon]);

    // console.log(allPokemons);
    // console.log(selectedPokemon);

    function randomNumberOfPokemonsToRender(
        getPokemonsOffset,
        getPokemonsLoadingLimit,
        numberOfPokemons
    ) {
        const numbers = new Set();

        while (numbers.size < numberOfPokemons) {
            const randomNumber =
                Math.floor(
                    Math.random() *
                        (getPokemonsLoadingLimit - getPokemonsOffset + 1)
                ) + getPokemonsOffset;

            numbers.add(randomNumber);
        }

        return [...numbers];
    }

    console.log(numberOfAvatarsToRender);
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                    margin: '20px',
                }}
            >
                {allPokemons.map((pokemon, index) => {
                    if (numberOfAvatarsToRender.includes(index)) {
                        return (
                            <Avatar
                                key={pokemon.name}
                                alt={pokemon.name}
                                src={pokemon.image}
                                sx={{ width: 80, height: 80 }}
                                onClick={() =>
                                    setSelectedPokemon({
                                        name: pokemon.name,
                                    })
                                }
                            />
                        );
                    }
                })}

                <Autocomplete
                    disablePortal
                    id='pick-your-pokemon'
                    options={allPokemons}
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField {...params} label='Pokemon' />
                    )}
                    onChange={(event, value) => {
                        {
                            value !== null &&
                                setSelectedPokemon({ name: value.name });
                        }
                    }}
                    selectOnFocus
                    clearOnBlur
                />
            </div>
            <PokemonDetail pokemonInfo={pokemonInfo} />
        </div>
    );
}
