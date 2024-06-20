const saveFavWPSite = async (wpsiteid, wpsiteURL, router) => {
    const response = await fetch(`/api/wordpress/site/fav`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            siteID: wpsiteid,
            siteURL: wpsiteURL,
        }),
    });

    console.log('Response:', response);

    // If middleware returns a 401, we redirect the user to the signup page
    if (response.status === 401) {
        // Set a flag in localStorage
        localStorage.setItem('needsLoginNotification', 'true');
        localStorage.setItem(
            'notificationMessage',
            '🦄 Please log in to save your favorite WordPress.com site!'
        );

        // Redirect or show an error using the router (only option for events handlers)
        router.push('/signup');
    } else if (response.status === 200) {
        const data = await response.json();
        // Update the user state as it was saved successfully
        // console.log('User from Avatar List:', data);
        // handleUpdateUserFavoritePokemons(data);
        return true;
    } else {
        // Handle other status codes
        console.error('Failed to save/delete favorite site');
        return false;
    }
};

export default saveFavWPSite;
