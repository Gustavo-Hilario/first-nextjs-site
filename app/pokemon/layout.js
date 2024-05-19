// Generate metadata for the layout applied to the Blog page.
export const metadata = {
    title: 'Pokemon',
    description: 'Check out some Pokemon info',
};

import Providers from '../components/StoreProviders';

export default function DashboardLayout({ children }) {
    return (
        <section>
            <Providers>{children}</Providers>
        </section>
    );
}
