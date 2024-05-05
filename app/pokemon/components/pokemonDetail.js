import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function PokemonDetail({ selectedPokemon }) {
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
            </Box>
            {Object.keys(selectedPokemon).length === 0 ? (
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
            {Object.keys(selectedPokemon).length !== 0 ? (
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
