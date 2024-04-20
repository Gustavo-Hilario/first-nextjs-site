'use client';
import { useEffect, useState } from 'react';

import { getAllPokemons, getPokemonDetail } from '../../lb/data/pokemonAPI';
import PokemonDetail from './pokemonDetail';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const NUMBER_OF_POKEMON_AVATARS = 20;

export default function Pokemon() {
    const [allPokemons, setAllPokemons] = useState([]);
    const [pokemonsLoadingLimit, setPokemonsLoadingLimit] = useState(150);
    const [pokemonsOffset, setPokemonsOffset] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState({});
    const [pokemonInfo, setPokemonInfo] = useState({});
    const [randomPokemonIDs, setRandomPokemonIDs] = useState([]);
    // const [loadingMorePokemons, setLoadingMorePokemons] = useState(false);

    useEffect(() => {
        async function fetchPokemons() {
            const data = await getAllPokemons(
                pokemonsLoadingLimit,
                pokemonsOffset
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
    }, [pokemonsLoadingLimit, pokemonsOffset]);

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
            // Randomly select 20 pokemons to render from the newly fetched pokemons
            randomNumberOfPokemonsToRender(
                pokemonsOffset,
                pokemonsLoadingLimit,
                NUMBER_OF_POKEMON_AVATARS
            )
        );
    }, [selectedPokemon, pokemonsLoadingLimit, pokemonsOffset]);

    function randomNumberOfPokemonsToRender(
        pokemonsOffset,
        pokemonsLoadingLimit,
        numberOfPokemons
    ) {
        const numbers = new Set();

        while (numbers.size < numberOfPokemons) {
            const randomNumber =
                Math.floor(
                    Math.random() * (pokemonsLoadingLimit - pokemonsOffset + 1)
                ) + pokemonsOffset;

            numbers.add(randomNumber);
        }

        return [...numbers];
    }

    console.log('allPokemons:', allPokemons);
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
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    textAlign: 'center',
                    m: 2,
                }}
            >
                <Typography
                    variant='body1'
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                    }}
                >
                    <p>
                        Displaying{' '}
                        <span>
                            <b>{NUMBER_OF_POKEMON_AVATARS}</b>
                        </span>{' '}
                        Pokemons out of{' '}
                        <span>
                            <b>{allPokemons.length}</b>
                        </span>
                    </p>
                    {/* {`Displaying ${NUMBER_OF_POKEMON_AVATARS} Pokemons out of `} */}
                    <Tooltip
                        title={`Between elements ${pokemonsOffset} and ${pokemonsLoadingLimit} from the list of all pokemons`}
                    >
                        <InfoRoundedIcon fontSize='small' />
                    </Tooltip>
                </Typography>

                <Button
                    size='small'
                    variant='bggradient'
                    color='secondary'
                    onClick={() => {
                        setRandomPokemonIDs(
                            // Randomly select 20 pokemons to render from the newly fetched pokemons
                            randomNumberOfPokemonsToRender(
                                pokemonsOffset,
                                pokemonsLoadingLimit,
                                NUMBER_OF_POKEMON_AVATARS
                            )
                        );
                    }}
                >
                    <RefreshRoundedIcon />
                    Refresh Avatars
                </Button>
                <Button
                    size='small'
                    variant='bggradient'
                    color='secondary'
                    onClick={() => {
                        setPokemonsOffset(0);
                        setPokemonsLoadingLimit(150);
                    }}
                >
                    <RefreshRoundedIcon />
                    Reset
                </Button>
            </Box>
            <Box
                component='section'
                display={{ sm: 'flex' }}
                alignItems='center'
                justifyContent='center'
                gap={2}
                sx={{
                    display: {
                        sm: 'flex',
                    },
                    justifyContent: 'center',
                    gap: 2,
                    textAlign: 'center',
                    m: 2,
                }}
            >
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
                    sx={{
                        width: {
                            xs: 'auto',
                            sm: 250,
                            md: 300,
                            lg: 400,
                            xl: 500,
                        },
                        mb: {
                            xs: 2,
                            sm: 0,
                        },
                    }}
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
                <Button
                    size='small'
                    variant='bggradient'
                    color='secondary'
                    onClick={() => {
                        // Load more pokemons -- max number of pokemons will be 1050
                        if (pokemonsLoadingLimit >= 1050) {
                            return;
                        }

                        setPokemonsOffset(pokemonsLoadingLimit);
                        setPokemonsLoadingLimit(pokemonsLoadingLimit + 150);
                    }}
                >
                    <AddCircleOutlineRoundedIcon />
                    Load More Pokemons
                </Button>{' '}
            </Box>
            <PokemonDetail
                pokemonInfo={pokemonInfo}
                selectedPokemon={selectedPokemon}
                setSelectedPokemon={setSelectedPokemon}
            />
        </div>
    );
}
