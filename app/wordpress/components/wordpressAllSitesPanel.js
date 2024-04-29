'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

import Badge from '@mui/material/Badge';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';

import { useState, useEffect } from 'react';

export default function WordPressAllSitesPanel({ sites }) {
    const [numberSitesLoading, setNumberSitesLoading] = useState(20);
    const [dotComSites, setDotComSites] = useState(sites);
    const [expandedItem, setExpandedItem] = useState(null);

    const handleExpansion = (siteID) => {
        expandedItem === siteID
            ? setExpandedItem(null)
            : setExpandedItem(siteID);
    };

    return (
        <>
            <Grid container>
                <h2>WordPress Sites Panel Component</h2>
                {dotComSites.sites.map((site, index) => {
                    console.log(site);
                    return (
                        <>
                            {index < numberSitesLoading && (
                                <Accordion
                                    key={site.ID}
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

                                        <Link href={site.URL}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 'bold',
                                                    fontStyle: 'italic',
                                                }}
                                            >
                                                {site.name}
                                            </Typography>
                                        </Link>

                                        <Badge
                                            badgeContent={
                                                site.subscribers_count
                                            }
                                            color='secondary'
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            max={999}
                                            sx={{
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
                                        <Typography>
                                            {site.description}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </>
                    );
                })}
                {dotComSites.sites.length > numberSitesLoading && (
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
            </Grid>
        </>
    );
}
