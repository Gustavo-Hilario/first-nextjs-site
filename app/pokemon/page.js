// With Suspense we can lazy load the component and show a loading content while the component is being loaded
// import { Suspense } from 'react';
// import Loading from './loading';

import Typography from '@mui/material/Typography';
import Pokemon from './components/pokemon';

// import { getSession } from '@auth0/nextjs-auth0';

// // Fetch the user favorite pokemons from the database
// async function fetchDBUser() {
//     const response = await fetch('http://localhost:3000/api/user', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     console.log('Response:', await response.json());
//     // if (response.status === 200) {
//     //     const data = await response.json();
//     //     return data;
//     // } else {
//     //     console.log('Failed to fetch user data');
//     // }
// }

export default async function PokemonPage() {
    // // Fetch the user session
    // const session = await getSession();
    // console.log('Session:', session?.user);

    // const dbUser = await fetchDBUser();
    // console.log('DB User:', dbUser);

    return (
        <div>
            <Typography
                variant='h2'
                noWrap
                component='a'
                href='#'
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
