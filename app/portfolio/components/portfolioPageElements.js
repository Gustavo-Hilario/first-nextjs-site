import Portfolio3DCard from './portfolio3DCard';

import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';

export default function PortfolioPageElements() {
    return (
        <>
            <Typography variant='h2' align='center'>
                Portfolio
            </Typography>
            <Box
                sx={{
                    m: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: {
                        xs: 2,
                        sm: 4,
                        md: 6,
                    },
                    flexWrap: {
                        sm: 'wrap',
                        md: 'nowrap',
                    },
                }}
            >
                <Zoom in={true}>
                    <Portfolio3DCard
                        title='Test'
                        description='Description Test. Description Test. Description Test. Description Test. Description Test. Description Test. vDescription Test. Description Test. Description Test. Description Test. Description Test. '
                        image={{
                            alt: 'Alt Text',
                            src: 'https://picsum.photos/id/237/200/300',
                        }}
                        // sx={{
                        //     flexBasis: '33%',
                        // }}
                    />
                </Zoom>
                <Zoom in={true} style={{ transitionDelay: '500ms' }}>
                    <Portfolio3DCard
                        title='Test'
                        description='Description Test. Description Test. Description Test. Description Test. Description Test. Description Test. vDescription Test. Description Test. Description Test. Description Test. Description Test. '
                        image={{
                            alt: 'Alt Text',
                            src: 'https://picsum.photos/id/37/200/300',
                        }}
                        // sx={{
                        //     flexBasis: '33%',
                        // }}
                    />
                </Zoom>
                <Zoom in={true} style={{ transitionDelay: '1000ms' }}>
                    <Portfolio3DCard
                        title='Test'
                        description='Description Test. Description Test. Description Test. Description Test. Description Test. Description Test. vDescription Test. Description Test. Description Test. Description Test. Description Test. '
                        image={{
                            alt: 'Alt Text',
                            src: 'https://picsum.photos/id/42/200/300',
                        }}
                        // sx={{
                        //     flexBasis: '33%',
                        // }}
                    />
                </Zoom>
            </Box>
        </>
    );
}
