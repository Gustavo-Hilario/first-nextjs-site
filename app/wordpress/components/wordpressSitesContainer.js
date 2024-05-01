'use client';

import { useState, useEffect } from 'react';

import { Container, Grid, Fab } from '@mui/material';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import WordPressAllSitesPanel from './wordpressAllSitesPanel';
import WordPressSingleSitePanel from './wordpressSingleSitePanel';

export default function WordPressSitesContainer({ wordPressComSites }) {
    // const [wordPressComSites, setWordPressComSites] = useState(sites);
    const [expandedItem, setExpandedItem] = useState(null);
    const [selectedSiteInfo, setSelectedSiteInfo] = useState(null);

    useEffect(() => {
        const currentSite = wordPressComSites.sites.find((site) => {
            return site.ID === expandedItem;
        });

        setSelectedSiteInfo(currentSite);
    }, [expandedItem]);

    return (
        <Container
            maxWidth={'xl'}
            sx={{
                mt: 0,
                pt: 2,
            }}
        >
            <Grid
                container
                spacing={2}
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 0 }}
            >
                <Grid
                    item
                    sm={12}
                    md={8}
                    sx={{
                        px: 2,
                        backgroundColor: 'background.dashnav',
                        boxShadow: 3,
                        borderRadius: 3,
                    }}
                >
                    {
                        // Pass the sites to the WordPressSitesPanel component
                        wordPressComSites && (
                            <WordPressAllSitesPanel
                                wordPressComSites={wordPressComSites}
                                expandedItem={expandedItem}
                                setExpandedItem={setExpandedItem}
                            />
                        )
                    }
                </Grid>

                <Grid
                    item
                    sm={12}
                    md={4}
                    sx={{
                        px: 2,
                        backgroundColor: 'background.dashcontent',
                        boxShadow: 3,
                        borderRadius: 3,
                    }}
                >
                    <WordPressSingleSitePanel site={selectedSiteInfo} />
                </Grid>
            </Grid>
            {/* Create a floating button to scroll to top or bottom */}
            <Fab
                color='primary'
                aria-label='add'
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                }}
            >
                <KeyboardArrowDownRoundedIcon />
            </Fab>
        </Container>
    );
}
