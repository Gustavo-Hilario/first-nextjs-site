import Header from '../components/header';
import MongoUser from './components/mongouser';

export default function MongoPage() {
    return (
        <div>
            <Header />
            <h1>Mongo Page</h1>
            <MongoUser />
        </div>
    );
}
