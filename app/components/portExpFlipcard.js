import React, { useState } from 'react';
import '../../src/styles/FlipCard.css';

import { Box, Typography, Avatar } from '@mui/material';

const PortExpFlipcard = ({ index, cardInfo }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = (index) => {
        console.log(index);
        setIsFlipped(!isFlipped);
    };

    console.log(cardInfo);

    return (
        <Box
            className={`flip-card-container ${isFlipped ? 'flipped' : ''}`}
            sx={{
                flexBasis: {
                    sm: 'calc(50% - 2rem)',
                    md: 'calc(33.33% - 2rem)',
                },
            }}
            onMouseEnter={() => handleFlip(index)}
            onMouseLeave={() => handleFlip(index)}
        >
            <Box className='flip-card-inner'>
                <Box className='flip-card-front'>
                    <Box>
                        <Box
                            className='flip-card-front-header'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1rem',
                            }}
                        >
                            <Avatar
                                src={cardInfo.avatarSRC}
                                alt='Test'
                                sx={{
                                    flexBasis: 'calc(25% - 1rem)',
                                    width: '100%',
                                    height: '100%',
                                    maxWidth: '100px',
                                    maxHeight: '100px',
                                }}
                            />
                            <Typography
                                variant='h4'
                                color='secondary'
                                sx={{
                                    flexBasis: '75%',
                                    fontWeight: 500,
                                }}
                            >
                                {cardInfo.company}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h6' sx={{ my: 2 }}>
                                {cardInfo.title}
                            </Typography>

                            <Typography variant='body1'>
                                {cardInfo.description}
                            </Typography>
                            <Typography variant='body1'>
                                {`${cardInfo.startDate} – ${cardInfo.endDate}`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box className='flip-card-back'>
                    <Box>
                        <Typography variant='body1'>
                            {cardInfo.backtext}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PortExpFlipcard;
