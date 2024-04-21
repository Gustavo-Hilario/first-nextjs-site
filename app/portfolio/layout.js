// Generate metadata for the layout applied to the Blog page.
export const metadata = {
    title: 'Portfolio',
    description: 'Check out some of my personal work',
};

export default function DashboardLayout({ children }) {
    return <section>{children}</section>;
}
