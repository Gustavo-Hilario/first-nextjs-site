// Generate metadata for the layout applied to the Blog page.
export const metadata = {
    title: 'Pokemon',
    description: 'Check out some Pokemon info',
};

export default function DashboardLayout({ children }) {
    return <section>{children}</section>;
}
