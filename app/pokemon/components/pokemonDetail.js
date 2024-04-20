import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PokemonDetail({
    pokemonInfo,
    selectedPokemon,
    setSelectedPokemon,
}) {
    return (
        <div>
            <Box
                component='section'
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    '& button': { m: 1, fontSize: '0.6rem' },
                }}
            >
                <Typography
                    variant='h4'
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    Details
                </Typography>
                {Object.keys(selectedPokemon).length !== 0 ? (
                    <Button
                        size='small'
                        variant='bggradient'
                        color='secondary'
                        onClick={() => {
                            setSelectedPokemon({});
                        }}
                    >
                        Clear
                    </Button>
                ) : (
                    ''
                )}
            </Box>
            {Object.keys(pokemonInfo).length === 0 ? (
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
            {Object.keys(pokemonInfo).length !== 0 ? (
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
                            <CardMedia
                                component='img'
                                height='140'
                                image={pokemonInfo.image}
                                alt={pokemonInfo.name}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='div'
                                >
                                    {pokemonInfo.name.charAt(0).toUpperCase() +
                                        pokemonInfo.name.slice(1)}
                                </Typography>
                                <Typography variant='body2' color='secondary'>
                                    <p>{`Weight: ${pokemonInfo.weight}`}</p>
                                    <p>{`Height: ${pokemonInfo.height}`}</p>
                                    <br />
                                    <p>
                                        <b>Abilities:</b>{' '}
                                    </p>
                                    {pokemonInfo.abilities !== undefined ? (
                                        pokemonInfo.abilities.map(
                                            (ability, index) => (
                                                <p key={index}>
                                                    {ability.ability.name}
                                                </p>
                                            )
                                        )
                                    ) : (
                                        <p>No abilities</p>
                                    )}
                                </Typography>
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
