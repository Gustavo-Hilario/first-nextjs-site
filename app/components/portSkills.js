'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const skills = [
    {
        title: 'WordPress',
        value: 90,
    },
    {
        title: 'JavaScript',
        value: 85,
    },
    {
        title: 'React',
        value: 75,
    },
    {
        title: 'Redux',
        value: 65,
    },
    {
        title: 'MongoDB',
        value: 60,
    },
];

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant='determinate' {...props} size={150} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant='h5'
                        component='div'
                        color='text.secondary'
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        variant='h6'
                        component='h6'
                        color='text.secondary'
                    >
                        {`${props.value}%`}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default function PortSkills() {
    return (
        <>
            <svg width={0} height={0}>
                <defs>
                    <linearGradient
                        id='my_gradient'
                        x1='0%'
                        y1='0%'
                        x2='0%'
                        y2='100%'
                    >
                        <stop offset='0%' stopColor='#e01cd5' />
                        <stop offset='100%' stopColor='#1CB5E0' />
                    </linearGradient>
                </defs>
            </svg>
            {skills.map((skill, index) => {
                return (
                    <CircularProgressWithLabel
                        key={index}
                        value={skill.value}
                        title={skill.title}
                        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
                    />
                );
            })}
        </>
    );
}
