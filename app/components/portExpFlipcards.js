import '../../src/styles/FlipCard.css';

import { Box } from '@mui/material';
import profilePulga from '../../public/profilePulga.jpeg';

import PortExpFlipcard from './portExpFlipcard';

const workExperience = [
    {
        avatarSRC: profilePulga.src,
        company: 'JotForm',
        title: 'Support Specialist',
        description:
            'Est conubia malesuada curabitur congue dis odio lacus leo, quam nunc magnis adipiscing vel mauris potenti. Massa gravida ipsum erat habitant efficitur primis curabitur hac, nibh aptent ultrices interdum pharetra et penatibus nunc varius, consectetur ante condimentum molestie morbi dui auctor. Eget nunc inceptos torquent potenti amet urna eu fames ac quam cubilia at ut, nascetur sollicitudin donec consectetur sed facilisi himenaeos natoque dictum senectus lobortis.',
        startDate: 'Feb 2020',
        endDate: 'July 2021',
        backtext:
            'Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. ',
    },
    {
        avatarSRC: profilePulga.src,
        company: 'WordPress.com',
        title: 'Support Specialist',
        description:
            'Est conubia malesuada curabitur congue dis odio lacus leo, quam nunc magnis adipiscing vel mauris potenti. Massa gravida ipsum erat habitant efficitur primis curabitur hac, nibh aptent ultrices interdum pharetra et penatibus nunc varius, consectetur ante condimentum molestie morbi dui auctor. Eget nunc inceptos torquent potenti amet urna eu fames ac quam cubilia at ut, nascetur sollicitudin donec consectetur sed facilisi himenaeos natoque dictum senectus lobortis.',
        startDate: 'Feb 2020',
        endDate: 'July 2021',
        backtext:
            'Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. ',
    },
    {
        avatarSRC: profilePulga.src,
        company: 'WordPress.com',
        title: 'Support Specialist',
        description:
            'Est conubia malesuada curabitur congue dis odio lacus leo, quam nunc magnis adipiscing vel mauris potenti. Massa gravida ipsum erat habitant efficitur primis curabitur hac, nibh aptent ultrices interdum pharetra et penatibus nunc varius, consectetur ante condimentum molestie morbi dui auctor. Eget nunc inceptos torquent potenti amet urna eu fames ac quam cubilia at ut, nascetur sollicitudin donec consectetur sed facilisi himenaeos natoque dictum senectus lobortis.',
        startDate: 'Feb 2020',
        endDate: 'July 2021',
        backtext:
            'Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. Gustavo --- JotForm. ',
    },
];

const PortExpFlipcards = () => {
    return (
        <Box
            className='flip-cards'
            sx={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
            }}
        >
            {workExperience.map((exp, index) => {
                return (
                    <PortExpFlipcard
                        key={exp.company}
                        index={index}
                        cardInfo={exp}
                    />
                );
            })}
        </Box>
    );
};

export default PortExpFlipcards;
