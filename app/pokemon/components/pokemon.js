'use client';
import { useEffect, useState, useRef } from 'react';

import { getAllPokemons, getPokemonDetail } from '../../lib/data/pokemonAPI';
import PokemonDetail from './pokemonDetail';
import AvatarList from '../../components/avatarList';
import DisplayRange from '../../components/displayRange';

import { Autocomplete, TextField, Button, Box } from '@mui/material';

import Grid from '@mui/system/Unstable_Grid';

import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// LEARN: Redux on Next.js >> https://redux.js.org/usage/nextjs
import {
    useAppDispatch,
    useAppSelector,
    useAppStore,
} from '../../../store/hooks';

import { addUser } from '../../../store/features/userSlice';

const NUMBER_OF_POKEMON_AVATARS = 20;

const generateRandomPokemonIDs = (limit, offset, user) => {
    const numbers = new Set();
    while (numbers.size < NUMBER_OF_POKEMON_AVATARS) {
        // // WRONG: Including favorite pokemons in the random selection
        // if (
        //     user !== null &&
        //     user !== undefined &&
        //     user.favoritePokemons !== null &&
        //     user.favoritePokemons !== undefined
        // ) {
        //     // console.log(user.favoritePokemons);
        //     user.favoritePokemons.forEach((favPokemon, index) => {
        //         if (index >= NUMBER_OF_POKEMON_AVATARS) return;
        //         return numbers.add(favPokemon.id);
        //     });
        // } else {
        const randomNumber =
            Math.floor(Math.random() * (limit - offset + 1)) + offset;
        numbers.add(randomNumber);
        // }
    }
    return [...numbers];
};

export default function Pokemon() {
    // Setting to check if the screen is mobile -- then use that to text accordingly
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Redux
    const store = useAppStore();
    const initialized = useRef(false);
    if (!initialized.current) {
        store.dispatch({ type: 'INIT' });
        initialized.current = true;
    }

    const user = useAppSelector((state) => state.user.userInfo);
    const dispatch = useAppDispatch();

    const [pokemonState, setPokemonState] = useState({
        pokemons: [],
        offset: 0,
        limit: 150,
        selectedPokemon: {},
        pokemonInfo: {},
        randomPokemonIDs: generateRandomPokemonIDs(150, 0, user),
    });

    const [loadPokemons, setLoadPokemons] = useState(false);

    // Fetch the user data from the database
    useEffect(() => {
        async function fetchDBUser() {
            // Fetch the user data from the database
            // Return only non-sensitive user data
            const response = await fetch('http://localhost:3000/api/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                // console.log('User FETCH Pokemon:', data.user);
                dispatch(addUser(data.user));
            } else {
                console.log('Failed to fetch user data');
            }
        }

        fetchDBUser();
    }, []);

    useEffect(() => {
        async function fetchPokemons() {
            const pokemonEndpoints = await getAllPokemons(
                pokemonState.limit,
                pokemonState.offset
            );

            async function fetchPokemonDetails() {
                const promises = pokemonEndpoints.map(async (pokemon) => {
                    const allPokeInfo = await getPokemonDetail(pokemon.name);
                    return {
                        ...allPokeInfo,
                        // LEARN: NAME SHOULD NOT BE CHANGED HERE
                        avatarName:
                            pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1),
                        avatarImage: allPokeInfo.sprites?.front_default,
                    };
                });

                const allPokemons = await Promise.all(promises);
                setPokemonState((prevState) => ({
                    ...prevState,
                    pokemons: allPokemons,
                }));
            }

            fetchPokemonDetails();
        }
        fetchPokemons();
    }, [loadPokemons, user]);

    const handleLoadMore = () => {
        if (pokemonState.limit >= 1050) return;
        setPokemonState((prevState) => ({
            ...prevState,
            offset: prevState.limit,
            limit: prevState.limit + 150,
            randomPokemonIDs: generateRandomPokemonIDs(
                prevState.limit + 150,
                prevState.limit,
                user
            ),
        }));
        setLoadPokemons(!loadPokemons);
    };

    const handleReset = () => {
        setPokemonState((prevState) => ({
            ...prevState,
            offset: 0,
            limit: 150,
            selectedPokemon: {},
            randomPokemonIDs: generateRandomPokemonIDs(150, 0, user),
        }));
    };

    const handleClearSelection = () => {
        setPokemonState((prev) => {
            return {
                ...prev,
                selectedPokemon: {},
            };
        });
    };

    const handleSelectPokemon = (name) => {
        const selected = pokemonState.pokemons.find(
            (pokemon) => pokemon.avatarName === name
        );
        setPokemonState((prevState) => ({
            ...prevState,
            selectedPokemon: selected || {},
        }));
    };

    const updatingUserFromAvatarList = (data) => {
        dispatch(addUser(data));
    };

    console.log('User:', user);

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
                <AvatarList
                    items={pokemonState.pokemons}
                    returnSelectedItem={handleSelectPokemon}
                    randomItemIDs={pokemonState.randomPokemonIDs}
                    userFavPokemons={user?.favoritePokemons}
                    handleUpdateUserFavoritePokemons={
                        updatingUserFromAvatarList
                    }
                />
            </div>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    textAlign: 'center',
                    m: 2,
                }}
            >
                <Grid container gap={2}>
                    <Grid
                        container
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <DisplayRange
                            loaded={NUMBER_OF_POKEMON_AVATARS}
                            rangeBase={pokemonState.offset}
                            rangeTop={pokemonState.limit}
                        />
                        <Button
                            size='small'
                            variant='bggradient'
                            color='secondary'
                            onClick={() => {
                                // Randomly select 20 pokemons to render from the newly fetched pokemons
                                setPokemonState((prevState) => ({
                                    ...prevState,
                                    randomPokemonIDs: generateRandomPokemonIDs(
                                        prevState.limit,
                                        prevState.offset,
                                        user
                                    ),
                                }));
                            }}
                        >
                            <RefreshRoundedIcon />
                            Refresh Avatars
                        </Button>
                    </Grid>
                    <Grid
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Autocomplete
                            disablePortal
                            id='pick-your-pokemon'
                            clearOnEscape
                            options={pokemonState.pokemons.map((pokemon) => {
                                return pokemon.avatarName;
                            })}
                            value={
                                Object.keys(pokemonState.selectedPokemon)
                                    .length !== 0
                                    ? pokemonState.selectedPokemon.avatarName
                                    : 'Pikachu'
                            }
                            sx={{
                                width: {
                                    xs: '100%',
                                    sm: 250,
                                    md: 300,
                                    lg: 400,
                                    xl: 500,
                                },
                            }}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} label='Pokemon' />
                            )}
                            onChange={(event, value) => {
                                if (value !== null) {
                                    handleSelectPokemon(value);
                                }
                            }}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        {pokemonState.limit < 1050 && (
                            <Button
                                size='small'
                                variant='bggradient'
                                color='secondary'
                                onClick={
                                    // Load more pokemons -- max number of pokemons will be 1050
                                    handleLoadMore
                                }
                            >
                                <AddCircleOutlineRoundedIcon />
                                Load More{!isMobile && ' Pokemons'}
                            </Button>
                        )}
                        {pokemonState.limit > 150 && (
                            <Button
                                size='small'
                                variant='bggradient'
                                color='secondary'
                                onClick={handleReset}
                            >
                                <RefreshRoundedIcon />
                                Reset
                            </Button>
                        )}
                        {Object.keys(pokemonState.selectedPokemon).length !==
                        0 ? (
                            <Button
                                size='small'
                                variant='bggradient'
                                color='secondary'
                                onClick={handleClearSelection}
                            >
                                Clear
                            </Button>
                        ) : (
                            ''
                        )}
                    </Grid>
                </Grid>
            </Box>

            <PokemonDetail selectedPokemon={pokemonState.selectedPokemon} />
        </div>
    );
}
