// Use Client is important to use the usePathname hook → Client Component
// Otherwise, it will throw an error.
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav
            style={{
                display: 'flex',
                gap: '1rem',
            }}
        >
            <Link
                className={`${pathname === '/' ? 'active-link' : ''}`}
                href='/'
            >
                Home
            </Link>
            <Link
                href='/pokemon'
                className={`${pathname === '/pokemon' ? 'active-link' : ''}`}
            >
                Pokemon
            </Link>
            <Link
                href='/signup'
                className={`${pathname === '/signup' ? 'active-link' : ''}`}
            >
                Sign Up
            </Link>
        </nav>
    );
}
