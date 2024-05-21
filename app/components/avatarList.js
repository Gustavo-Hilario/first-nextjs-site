import { Box, Avatar, Grow, Badge, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { handleSaveRemoveFavoritePokemon } from '../pokemon/utils/pokemonUtils';

import { useRouter } from 'next/navigation';

export default function AvatarList({
    items,
    returnSelectedItem,
    randomItemIDs,
    userFavPokemons,
    handleUpdateUserFavoritePokemons,
}) {
    const router = useRouter();
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
                                        pokemon.id,
                                        pokemon.avatarName,
                                        handleUpdateUserFavoritePokemons,
                                        router
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
