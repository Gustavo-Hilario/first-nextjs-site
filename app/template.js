'use client';

import AnimatedCursor from './components/animatedCursor';

export default function Template({ children }) {
    return (
        <>
            <AnimatedCursor />
            <>{children}</>
        </>
    );
}
