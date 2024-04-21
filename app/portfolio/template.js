import Header from '../components/pagetoparea';

export default function Template({ children }) {
    return (
        <>
            <Header title={'Blog Page Header'}>
                <h2>This is coming from the Pokemon template</h2>
            </Header>
            <div>{children}</div>
        </>
    );
}
