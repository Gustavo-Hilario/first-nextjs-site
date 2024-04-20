'use client';
import { useEffect, useState } from 'react';

import { getAllPokemons, getPokemonDetail } from '../../lb/data/pokemonAPI';
import PokemonDetail from './pokemonDetail';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

const NUMBER_OF_POKEMON_AVATARS = 20;

export default function Pokemon() {
    const [allPokemons, setAllPokemons] = useState([]);
    const [PokemonsLoadingLimit, setPokemonsLoadingLimit] = useState(150);
    const [PokemonsOffset, setPokemonsOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [randomPokemonIDs, setRandomPokemonIDs] = useState([]);

    useEffect(() => {
        async function fetchPokemons() {
            const data = await getAllPokemons(
                PokemonsLoadingLimit,
                PokemonsOffset
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
                setPokemonInfo({
                    name: data.name,
                    weight: data.weight,
                    height: data.height,
                    abilities: data.abilities,
                    image: data.sprites?.front_default,
                });
            } else {
                setPokemonInfo({});
            }
        }

        fetchPokemonDetail();
        setRandomPokemonIDs(
            randomNumberOfPokemonsToRender(
                PokemonsOffset,
                PokemonsLoadingLimit,
                NUMBER_OF_POKEMON_AVATARS
            )
        );
    }, [selectedPokemon, PokemonsLoadingLimit, PokemonsOffset]);

    function randomNumberOfPokemonsToRender(
        PokemonsOffset,
        PokemonsLoadingLimit,
        numberOfPokemons
    ) {
        const numbers = new Set();

        while (numbers.size < numberOfPokemons) {
            const randomNumber =
                Math.floor(
                    Math.random() * (PokemonsLoadingLimit - PokemonsOffset + 1)
                ) + PokemonsOffset;

            numbers.add(randomNumber);
        }

        return [...numbers];
    }

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
                    if (randomPokemonIDs.includes(index)) {
                        return (
                            <Avatar
                                variant='circular'
                                key={pokemon.name}
                                alt={pokemon.name}
                                src={pokemon.image}
                                sx={{
                                    width: 80,
                                    height: 80,
                                }}
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
                    clearOnEscape
                    options={allPokemons.map((pokemon) => {
                        return pokemon.name;
                    })}
                    value={
                        Object.keys(selectedPokemon).length !== 0
                            ? selectedPokemon.name
                            : ''
                    }
                    sx={{ width: 300 }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                        <TextField {...params} label='Pokemon' />
                    )}
                    onChange={(event, value) => {
                        console.log(event);
                        if (value !== null) {
                            setSelectedPokemon({ name: value });
                            return;
                        }
                        setSelectedPokemon({});
                    }}
                />
            </div>
            <PokemonDetail
                pokemonInfo={pokemonInfo}
                selectedPokemon={selectedPokemon}
                setSelectedPokemon={setSelectedPokemon}
            />
        </div>
    );
}
