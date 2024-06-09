import { Suspense } from 'react';
import Loading from './loading';

import Header from '../components/header';
import WordPressSites from './components/wordpressSites';

export default function WordPressComPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<Loading />}>
                <WordPressSites />
            </Suspense>
        </>
    );
}
