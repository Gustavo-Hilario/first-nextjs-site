// Generate metadata for the layout applied to the Blog page.
export const metadata = {
    title: 'WordPress.com',
    description: 'Check out some of my work at WordPress.com',
};

export default function DashboardLayout({ children }) {
    return <>{children}</>;
}
