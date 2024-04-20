// With Suspense we can lazy load the component and show a loading content while the component is being loaded
// import { Suspense } from 'react';
// import Loading from './loading';

import Typography from '@mui/material/Typography';

import Pokemon from './components/pokemon';

export default function PokemonPage() {
    return (
        <div>
            <Typography
                variant='h2'
                noWrap
                component='a'
                href='#app-bar-with-responsive-menu'
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    justifyContent: 'center',
                }}
            >
                Pokemons
            </Typography>
            <Pokemon />
        </div>
    );
}
