import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Portfolio3DCard(props) {
    function propsExists() {
        return props && props.title && props.description && props.image;
    }

    return (
        propsExists() && (
            <Box
                sx={{
                    width: 'fit-content',
                    perspective: '1000px',
                    // transition: 'transform 0.4s',
                    // '& > div, & > div > div': {
                    //     transition: 'inherit',
                    // },
                    '&:hover': {
                        '& > div': {
                            transform: 'rotateY(15deg)',
                            '& > div:nth-child(2)': {
                                transform:
                                    'scaleY(1) translate3d(5px, 5px, 5px)',
                            },
                            '& > div:nth-child(3)': {
                                transform: 'translate3d(5px, 5px, 5px)',
                            },
                        },
                    },
                }}
            >
                <Card>
                    <CardMedia
                        component='img'
                        alt={props.image.alt}
                        height='440'
                        image={props.image.src}
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                            {props.title}
                        </Typography>
                        <Typography variant='body2' color='primary'>
                            {props.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size='small' color='secondary'>
                            Share
                        </Button>
                        <Button size='small' color='secondary'>
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        )
    );
}
