import Header from '../components/header';

export default function Template({ children }) {
    return (
        <>
            <Header title={'Blog Page Header'}>
                <h2>This is coming from the Blog template</h2>
            </Header>
            <div>{children}</div>
        </>
    );
}
