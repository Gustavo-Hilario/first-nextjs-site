'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Tilt from 'react-parallax-tilt';

const languages = [
    {
        title: 'English',
        value: 90,
        emoji: '🇺🇸',
    },
    {
        title: 'Spanish',
        value: 90,
        emoji: '🇪🇸',
    },
    {
        title: 'Portuguese',
        value: 100,
        emoji: '🇧🇷',
    },
];

export default function PortLangs() {
    return (
        <>
            {languages.map((lang, index) => {
                return (
                    <Box
                        key={index}
                        color='text.primary'
                        sx={{
                            borderRadius: '20px',
                        }}
                    >
                        <Tilt
                            key={index}
                            className='background-stripes parallax-effect'
                            perspective={500}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '300px',
                                height: '300px',
                                background:
                                    'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                // border: '5px solid black',
                                borderRadius: '20px',
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <div
                                className='inner-element'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: '35px',
                                    transform: 'translateZ(60px)',
                                }}
                            >
                                <div>{lang.emoji}</div>
                                <div>{lang.title}</div>
                                <div>{`${lang.value}%`}</div>
                            </div>
                        </Tilt>
                    </Box>
                );
            })}
        </>
    );
}
