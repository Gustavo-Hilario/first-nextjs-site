import { getSession } from '@auth0/nextjs-auth0';

import Header from '../components/header';
import Grid from '@mui/material/Grid';

export default async function DashboardLayout({ children }) {
    // Session is an object that contains user information
    // This is provided by auth0
    const session = await getSession();

    console.log(session?.user);

    return (
        <>
            {session?.user && (
                <>
                    <Header />
                    <Grid
                        container
                        sx={{
                            flexWrap: 'nowrap',
                            gap: 1,
                        }}
                    >
                        <Grid
                            item
                            sm={12}
                            md={4}
                            sx={{
                                minHeight: {
                                    // 100% - 64px (Header height) - 36px (padding and margin height)
                                    md: 'calc(100vh - 100px)',
                                },
                                m: 2,
                                p: 2,
                                backgroundColor: 'background.dashnav',
                                boxShadow: 3,
                                borderRadius: 3,
                            }}
                        >
                            Account Actions/Settings goes here
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            md={8}
                            sx={{
                                minHeight: {
                                    md: 'calc(100vh - 100px)',
                                },
                                m: 2,
                                p: 2,
                                backgroundColor: 'background.dashcontent',
                                boxShadow: 3,
                                borderRadius: 3,
                            }}
                        >
                            {children}
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
