import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function PokemonDetail({ pokemonInfo }) {
    return (
        <div>
            <h3>Pokemon Detail</h3>
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
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
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
                <p>No Pokemon selected</p>
            )}
        </div>
    );
}
