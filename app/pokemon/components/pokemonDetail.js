import {
    Card,
    CardContent,
    CardMedia,
    CardActionArea,
    Typography,
    Button,
    Box,
    Badge,
} from '@mui/material';

import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useRouter } from 'next/navigation';
import { handleSaveRemoveFavoritePokemon } from '../utils/pokemonUtils';

export default function PokemonDetail({
    selectedPokemon,
    userFavPokemons,
    handleUpdateUserFavoritePokemons,
}) {
    const router = useRouter();

    const selectedPokemonExists = () => {
        return Object.keys(selectedPokemon).length !== 0;
    };

    return (
        <div>
            {!selectedPokemonExists() ? (
                <Typography
                    variant='body1'
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    No pokemon selected!
                </Typography>
            ) : (
                ''
            )}
            {selectedPokemonExists() ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <Badge
                                badgeContent={
                                    userFavPokemons?.find(
                                        (fav) => fav.id === selectedPokemon.id
                                    ) ? (
                                        <CheckCircleRoundedIcon />
                                    ) : (
                                        <FavoriteRoundedIcon />
                                    )
                                }
                                color={
                                    userFavPokemons?.find(
                                        (fav) => fav.id === selectedPokemon.id
                                    )
                                        ? 'default'
                                        : 'secondary'
                                }
                                overlap='circular'
                                sx={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    padding: '15px 0',
                                }}
                                onClick={(ev) => {
                                    if (
                                        !ev.target
                                            .closest('svg')
                                            ?.classList.contains(
                                                'MuiSvgIcon-root'
                                            )
                                    ) {
                                        return;
                                    }
                                    handleSaveRemoveFavoritePokemon(
                                        selectedPokemon.id,
                                        selectedPokemon.avatarName,
                                        handleUpdateUserFavoritePokemons,
                                        router
                                    );
                                }}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    {selectedPokemonExists()
                                        ? selectedPokemon.avatarName
                                        : 'Select a Pokemon'}
                                </Typography>
                            </Badge>
                            <CardMedia
                                component='img'
                                height='auto'
                                image={selectedPokemon.avatarImage}
                                alt={selectedPokemon.avatarName}
                            />

                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='div'
                                >
                                    {/* {selectedPokemon.name.charAt(0).toUpperCase() +
                                        selectedPokemon.name.slice(1)} */}
                                </Typography>
                                <Box
                                    component='section'
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 2,
                                        '& button': {
                                            m: 1,
                                            fontSize: '0.6rem',
                                        },
                                    }}
                                >
                                    <div>
                                        <Typography color='secondary'>
                                            <b>{`Weight: ${selectedPokemon.weight}`}</b>
                                        </Typography>
                                        <Typography color='secondary'>
                                            <b>{`Height: ${selectedPokemon.height}`}</b>
                                        </Typography>
                                        <br />
                                        <Typography color='secondary'>
                                            <b>Abilities:</b>{' '}
                                        </Typography>
                                        {selectedPokemon.abilities !==
                                        undefined ? (
                                            selectedPokemon.abilities.map(
                                                (ability, index) => (
                                                    <Typography
                                                        color='secondary'
                                                        key={index}
                                                    >
                                                        {ability.ability.name}
                                                    </Typography>
                                                )
                                            )
                                        ) : (
                                            <Typography color='secondary'>
                                                No abilities
                                            </Typography>
                                        )}
                                    </div>
                                    <div>
                                        <br />
                                        <b>Stats:</b>
                                        {selectedPokemon.stats !== undefined ? (
                                            selectedPokemon.stats.map(
                                                (stat, index) => (
                                                    <Typography
                                                        variant='body2'
                                                        key={index}
                                                        color='secondary'
                                                    >
                                                        <span>
                                                            <em>
                                                                {stat.stat.name}
                                                            </em>
                                                        </span>
                                                        : {stat.base_stat}
                                                    </Typography>
                                                )
                                            )
                                        ) : (
                                            <p>No abilities</p>
                                        )}
                                    </div>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
