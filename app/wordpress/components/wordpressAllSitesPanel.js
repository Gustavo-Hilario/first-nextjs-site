'use client';

import {
    Box,
    Accordion,
    AccordionSummary,
    Avatar,
    AccordionDetails,
    Typography,
    Button,
    Fade,
    Badge,
    Autocomplete,
    TextField,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import saveFavWPSite from '../utils/wordpressUtils';

export default function WordPressAllSitesPanel({
    wordPressComSites,
    expandedItem,
    setExpandedItem,
    setSelectedSiteInfo,
}) {
    const router = useRouter();

    const [numberSitesLoading, setNumberSitesLoading] = useState(20);
    // console.log(wordPressComSites);

    const handleExpansion = (siteID) => {
        expandedItem === siteID
            ? setExpandedItem(null)
            : setExpandedItem(siteID);
    };

    return (
        <>
            {wordPressComSites.sites.length > numberSitesLoading && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        width: '100%',
                        my: 2,
                    }}
                >
                    <h2>Your WordPress.com Sites</h2>
                    <Button
                        size='small'
                        variant='bggradient'
                        color='secondary'
                        onClick={() =>
                            setNumberSitesLoading(numberSitesLoading + 50)
                        }
                    >
                        Load More Sites
                    </Button>
                </Box>
            )}
            <Autocomplete
                disablePortal
                id='all-dotcom-sites'
                options={wordPressComSites.sites.map((site) => {
                    return site;
                })}
                getOptionLabel={(option) => {
                    return `${option.name} – ${option.URL}`;
                }}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label='Search Sites'
                            variant='standard'
                        />
                    );
                }}
                onChange={(event, value) => {
                    setSelectedSiteInfo(value);
                }}
                sx={{
                    mb: 2,
                }}
            />
            {wordPressComSites.sites.map((site, index) => {
                return (
                    <Box key={site.ID}>
                        {index < numberSitesLoading && (
                            <Accordion
                                id={site.ID}
                                expanded={
                                    expandedItem === site.ID ? true : false
                                }
                                onChange={() => handleExpansion(site.ID)}
                                slots={{ transition: Fade }}
                                slotProps={{
                                    transition: { timeout: 400 },
                                }}
                                sx={{
                                    width: '100%',
                                    '& .MuiAccordion-region': {
                                        height:
                                            expandedItem === site.ID
                                                ? 'auto'
                                                : 0,
                                    },
                                    '& .MuiAccordionDetails-root': {
                                        display:
                                            expandedItem === site.ID
                                                ? 'block'
                                                : 'none',
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${site.ID}-content`}
                                    id={`panel${site.ID}-header`}
                                    sx={{
                                        alignItems: 'center',
                                        '& .MuiAccordionSummary-content': {
                                            alignItems: 'center',
                                            gap: 2,
                                        },
                                    }}
                                >
                                    <Avatar
                                        alt={site.name}
                                        src={
                                            site.icon
                                                ? site.icon.img
                                                : site.logo.url
                                                ? site.logo.url
                                                : '/a8cLogo.png'
                                        }
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexBasis: '100%',
                                            '& a': {
                                                borderBottom:
                                                    '1px solid #a45800',
                                            },
                                            '& a:hover': {
                                                borderBottom:
                                                    '2px solid #a45800',
                                            },
                                            '& a:hover .MuiTypography-root': {
                                                fontWeight: '900',
                                            },
                                        }}
                                    >
                                        <a
                                            href={site.URL}
                                            target='_blank'
                                            // LEARN: GET styles from theme and pass them to regular HTML elements -- color="secondary"·
                                        >
                                            <Typography
                                                sx={{
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                {site.name}
                                            </Typography>
                                        </a>
                                    </Box>

                                    <StarOutlineRoundedIcon
                                        className='clickable'
                                        onClick={async (ev) => {
                                            ev.stopPropagation();

                                            await saveFavWPSite(
                                                site.ID,
                                                site.URL,
                                                router
                                            );
                                        }}
                                    />
                                    <Badge
                                        className='clickable'
                                        badgeContent={site.subscribers_count}
                                        color='secondary'
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        max={999}
                                        sx={{
                                            mr: '30px',
                                            '& .MuiBadge-badge': {
                                                p: 0,
                                                top: '-5px',
                                                right: '-2px',
                                            },
                                        }}
                                        showZero
                                    >
                                        <PeopleAltRoundedIcon />
                                    </Badge>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{site.description}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        )}
                    </Box>
                );
            })}
            {wordPressComSites.sites.length > numberSitesLoading && (
                <Box
                    sx={{
                        textAlign: 'center',
                        width: '100%',
                        my: 2,
                    }}
                >
                    <Button
                        size='small'
                        variant='bggradient'
                        color='secondary'
                        onClick={() =>
                            setNumberSitesLoading(numberSitesLoading + 50)
                        }
                    >
                        Load More Sites
                    </Button>
                </Box>
            )}
        </>
    );
}
