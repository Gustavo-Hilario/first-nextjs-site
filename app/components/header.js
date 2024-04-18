import Navigation from './navigation';

export default function Header({ title }) {
    return (
        <>
            <div
                className='site-header'
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    background: 'lightblue',
                }}
            >
                <h1>{title}</h1>
                <Navigation />
            </div>
        </>
    );
}
