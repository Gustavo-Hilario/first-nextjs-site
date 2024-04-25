import { getSession } from '@auth0/nextjs-auth0';

import Header from '../components/header';
import Grid from '@mui/material/Grid';
import { Height } from '@mui/icons-material';

export default async function DashboardLayout({ children }) {
    // Session is an object that contains user information
    // This is provided by auth0
    const session = await getSession();

    return (
        <>
            {session?.user && (
                <>
                    <Header />
                    <Grid container>
                        <Grid
                            item
                            sm={12}
                            md={4}
                            sx={{
                                height: {
                                    md: '100vh',
                                },
                                backgroundColor: 'background.dashnav',
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
                                    md: '100vh',
                                },
                                backgroundColor: 'background.dashcontent',
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
