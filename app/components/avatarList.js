import { Box, Avatar, Grow, Badge, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import { useRouter } from 'next/navigation';

export default function AvatarList({
    items,
    returnSelectedItem,
    randomItemIDs,
}) {
    const router = useRouter();

    const handleSaveRemoveFavoritePokemon = async (
        pokemonid,
        pokemonName,
        user
    ) => {
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
            // console.log(data);
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
                                badgeContent={<FavoriteRoundedIcon />}
                                color='secondary'
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
