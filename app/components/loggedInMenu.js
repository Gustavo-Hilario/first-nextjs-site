import {
    Button,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from '@mui/material';

import Link from 'next/link';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

import { useState } from 'react';

const settings = [
    { title: 'Profile', path: '/' },
    { title: 'Account', path: '/' },
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Logout', path: '/api/auth/logout' },
];

export default function LoggedInMenu({ user, pathname }) {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            {
                // Logged in User
                (user && (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings' followCursor>
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
                            sx={{
                                mt: '45px',
                                '& a.active-link p': {
                                    fontWeight: 900,
                                },
                            }}
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
                                    className={
                                        pathname === setting.path
                                            ? 'active-link'
                                            : ''
                                    }
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        {setting.title === 'Logout' ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
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
                            </Button>
                        </Link>
                    </Box>
                )
            }
        </div>
    );
}
