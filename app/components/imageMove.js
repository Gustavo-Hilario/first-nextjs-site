'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

export default function ImageMove({ image, alt, isMobile }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
            }}
        >
            <Tilt
                className='background-stripes parallax-effect'
                perspective={500}
                style={{
                    maxWidth: 'fit-content',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    className='inner-element'
                    style={{
                        // transform: 'translateZ(60px)',
                        width: isMobile ? '300px' : '600px',
                        height: isMobile ? '300px' : '600px',
                    }}
                >
                    <Image
                        src={image}
                        alt={alt}
                        style={{
                            borderRadius: '20%',
                            border: '5px solid white',
                            opacity: 0.6,
                            width: isMobile ? '300px' : '600px',
                            height: isMobile ? '300px' : '600px',
                            transition: 'all 0.5s ease-in-out',
                        }}
                    />
                </div>
            </Tilt>
        </Box>
    );
}
