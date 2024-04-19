// With Suspense we can lazy load the component and show a loading content while the component is being loaded
import { Suspense } from 'react';
import Loading from './loading';

import Pokemon from './components/pokemon';

export default function PokemonPage() {
    return (
        <div>
            <h3>Pokemon</h3>
            <Suspense fallback={<Loading />}>
                <Pokemon />
            </Suspense>
        </div>
    );
}
