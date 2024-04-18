// Generate metadata for the layout applied to the Blog page.
export const metadata = {
    title: 'Blog',
    description: 'Access all the latest blog posts.',
};

export default function DashboardLayout({ children }) {
    return <section>{children}</section>;
}
