// Use Client is important to use the usePathname hook → Client Component
// Otherwise, it will throw an error.
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useRef } from 'react';

import {
    AppBar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LogoDevIcon from '@mui/icons-material/LogoDev';

import Slide from '@mui/material/Slide';

import LoggedInMenu from './loggedInMenu';

// const pages = ['Products', 'Pricing', 'Blog'];

const mainMenuPages = [
    { title: 'Home', path: '/' },
    { title: 'Pokemon', path: '/pokemon' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'WordPress.com', path: '/wordpress' },
    // { title: 'Signup', path: '/signup' },
];

const accountPages = [
    { title: 'Login', path: '/api/auth/login' },
    { title: 'Signup', path: '/pokemon' },
];

export default function Header() {
    const { user } = useUser();
    const pathname = usePathname();
    const toolbarRef = useRef(null);

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <AppBar
                position='static'
                sx={{
                    backgroundImage: 'unset',
                }}
            >
                <Container
                    maxWidth='xl'
                    sx={{
                        my: '2rem',
                        p: 0,
                    }}
                >
                    <Slide
                        direction='right'
                        in={true}
                        easing={'ease-in-out'}
                        timeout={1000}
                        mountOnEnter
                        unmountOnExit
                    >
                        <Toolbar
                            disableGutters
                            sx={{
                                backgroundColor: 'background.dashnav',
                                borderRadius: toolbarRef.current?.clientHeight
                                    ? toolbarRef.current?.clientHeight / 2
                                    : '20px',
                            }}
                            ref={toolbarRef}
                        >
                            {/* Mobile Bar Content */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'flex', md: 'none' },
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton
                                    size='large'
                                    aria-label='account of current user'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleOpenNavMenu}
                                    color='inherit'
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Menu
                                    id='menu-appbar'
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {mainMenuPages.map((page) => (
                                        <MenuItem
                                            key={page.title}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Link
                                                className={
                                                    pathname === page.path
                                                        ? 'active-link'
                                                        : ''
                                                }
                                                href={page.path}
                                            >
                                                <Typography textAlign='center'>
                                                    {page.title}
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Link href='/'>
                                        <LogoDevIcon
                                            sx={{
                                                display: {
                                                    xs: 'flex',
                                                    md: 'none',
                                                },
                                                mr: 1,
                                            }}
                                        />
                                    </Link>

                                    <Typography
                                        variant='h5'
                                        noWrap
                                        component='h1'
                                        href='#'
                                        sx={{
                                            fontFamily: 'monospace',
                                            fontWeight: 700,
                                            letterSpacing: '.3rem',
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        <Link href='/'>Gustavo</Link>
                                    </Typography>
                                </Box>
                                <LoggedInMenu user={user} pathname={pathname} />
                            </Box>

                            {/* Desktop Bar Content */}
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'none', md: 'flex' },
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    '& a.active-link': {
                                        fontWeight: 900,
                                    },
                                }}
                            >
                                {mainMenuPages.map((page) => (
                                    <Link
                                        className={
                                            pathname === page.path
                                                ? 'active-link'
                                                : ''
                                        }
                                        href={page.path}
                                        key={page.title}
                                        style={{
                                            marginRight: '1rem',
                                            borderRadius: '20px',
                                        }}
                                    >
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            variant='navlinksbuttons'
                                            sx={{
                                                display: 'block',
                                                fontWeight: 'inherit',
                                                borderRadius: '20px',
                                            }}
                                        >
                                            {page.title}
                                        </Button>
                                    </Link>
                                ))}
                                <LoggedInMenu user={user} pathname={pathname} />
                            </Box>
                        </Toolbar>
                    </Slide>
                </Container>
            </AppBar>
        </>
    );
}
