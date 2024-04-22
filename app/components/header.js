// Use Client is important to use the usePathname hook → Client Component
// Otherwise, it will throw an error.
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import LogoDevIcon from '@mui/icons-material/LogoDev';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

// const pages = ['Products', 'Pricing', 'Blog'];

const mainMenuPages = [
    { title: 'Home', path: '/' },
    { title: 'Pokemon', path: '/pokemon' },
    { title: 'Portfolio', path: '/portfolio' },
    { title: 'Signup', path: '/signup' },
];

const accountPages = [
    { title: 'Login', path: '/api/auth/login' },
    { title: 'Signup', path: '/pokemon' },
];

const settings = [
    { title: 'Profile', path: '/' },
    { title: 'Account', path: '/' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Logout', path: '/api/auth/logout' },
];

import UserForm from './userForm';

export default function Header() {
    const { user, error, isLoading } = useUser();
    const pathname = usePathname();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        {/* Desktop Content */}
                        <Link href='/'>
                            <LogoDevIcon
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    mr: 1,
                                }}
                            />
                        </Link>

                        <Typography
                            variant='h6'
                            noWrap
                            component='h1'
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link href='/'>Gustavo</Link>
                        </Typography>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
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
                        </Box>

                        {/* Mobile Content */}
                        <Link href='/'>
                            <LogoDevIcon
                                sx={{
                                    display: { xs: 'flex', md: 'none' },
                                    mr: 1,
                                }}
                            />
                        </Link>

                        <Typography
                            variant='h5'
                            noWrap
                            component='h1'
                            href='#app-bar-with-responsive-menu'
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link href='/'>Gustavo</Link>
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                '& a.active-link': {
                                    fontWeight: 900,
                                },
                            }}
                        >
                            {mainMenuPages.map((page) => (
                                <Link
                                    key={page.title}
                                    className={
                                        pathname === page.path
                                            ? 'active-link'
                                            : ''
                                    }
                                    href={page.path}
                                >
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                            fontWeight: 'inherit',
                                        }}
                                    >
                                        {page.title}
                                    </Button>
                                </Link>
                            ))}
                        </Box>

                        {
                            // Logged in User
                            (user && (
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title='Open settings'>
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                        >
                                            <Avatar
                                                alt='header-profile-avatar'
                                                src={user.picture}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id='menu-appbar'
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <Link
                                                key={setting.title}
                                                href={setting.path}
                                            >
                                                <MenuItem
                                                    onClick={
                                                        handleCloseUserMenu
                                                    }
                                                >
                                                    {setting.title ===
                                                    'Logout' ? (
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <LogoutRoundedIcon />
                                                            <Typography textAlign='center'>
                                                                {setting.title}
                                                            </Typography>
                                                        </div>
                                                    ) : (
                                                        <Typography textAlign='center'>
                                                            {setting.title}
                                                        </Typography>
                                                    )}
                                                </MenuItem>
                                            </Link>
                                        ))}
                                    </Menu>
                                </Box>
                            )) || (
                                // Not Logged in User
                                <Box sx={{ flexGrow: 0 }}>
                                    <Link href='/api/auth/login'>
                                        <Button color='inherit'>
                                            <LoginRoundedIcon />
                                            Login
                                        </Button>
                                    </Link>
                                </Box>
                            )
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <UserForm />
        </>
    );
}
