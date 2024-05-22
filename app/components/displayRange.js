import { Typography, Tooltip } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export default function DisplayRange({ loaded, rangeBase, rangeTop }) {
    return (
        <>
            <Typography
                variant='body1'
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                Displaying{' '}
                <span>
                    <b>{loaded}</b>
                </span>{' '}
                Pokemons out of{' '}
                <span>
                    <b>{rangeTop}</b>
                </span>
                {/* {`Displaying ${NUMBER_OF_POKEMON_AVATARS} Pokemons out of `} */}
                <Tooltip
                    title={`Between elements ${rangeBase} and ${rangeTop} from the list of all pokemons`}
                    followCursor
                >
                    <InfoRoundedIcon fontSize='small' />
                </Tooltip>
            </Typography>
        </>
    );
}
