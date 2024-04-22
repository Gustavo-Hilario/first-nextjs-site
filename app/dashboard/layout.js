import { getSession } from '@auth0/nextjs-auth0';

// import Header from '../components/header';

export default async function DashboardLayout({ children }) {
    const session = await getSession();

    return <>{session?.user && <>{children}</>}</>;
}
