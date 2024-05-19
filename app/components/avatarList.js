import { Box, Avatar, Grow, Badge, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useRouter } from 'next/navigation';

export default function AvatarList({
    items,
    returnSelectedItem,
    randomItemIDs,
    userFavPokemons,
    handleUpdateUserFavoritePokemons,
}) {
    const router = useRouter();

    const handleSaveRemoveFavoritePokemon = async (pokemonid, pokemonName) => {
        const response = await fetch('/api/pokemon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pokemonID: pokemonid,
                pokemonName: pokemonName,
            }),
        });

        // If middleware returns a 401, you can redirect to a signup page
        if (response.status === 401) {
            // Redirect or show an error using the router (only option for events handlers)
            router.push('/signup');
        } else if (response.status === 200) {
            const data = await response.json();
            // Update the user state as it was saved successfully
            console.log('User from Avatar List:', data);
            handleUpdateUserFavoritePokemons(data);
        } else {
            // Handle other status codes
            console.error('Failed to save/delete favorite pokemon');
        }
    };

    return (
        <>
            {items.map((pokemon, index) => {
                if (randomItemIDs.includes(index)) {
                    return (
                        <Grow
                            in={true}
                            key={pokemon.avatarName}
                            style={{ transformOrigin: '0 0 0' }}
                            timeout={500 + index * 2}
                        >
                            <Badge
                                badgeContent={
                                    userFavPokemons?.find(
                                        (fav) => fav.id === pokemon.id
                                    ) ? (
                                        <CheckCircleRoundedIcon />
                                    ) : (
                                        <FavoriteRoundedIcon />
                                    )
                                }
                                color={
                                    userFavPokemons?.find(
                                        (fav) => fav.id === pokemon.id
                                    )
                                        ? 'default'
                                        : 'secondary'
                                }
                                overlap='circular'
                                onClick={() => {
                                    handleSaveRemoveFavoritePokemon(
                                        pokemon.id,
                                        pokemon.avatarName
                                    );
                                }}
                            >
                                <Box>
                                    <Avatar
                                        variant='circular'
                                        key={pokemon.avatarName}
                                        alt={pokemon.avatarName}
                                        src={pokemon.avatarImage}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                        }}
                                        onClick={() =>
                                            returnSelectedItem(
                                                pokemon.avatarName
                                            )
                                        }
                                    />
                                </Box>
                            </Badge>
                        </Grow>
                    );
                }
            })}
        </>
    );
}
