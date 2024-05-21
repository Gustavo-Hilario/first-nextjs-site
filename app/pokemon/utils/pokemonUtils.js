export const handleSaveRemoveFavoritePokemon = async (
    pokemonid,
    pokemonName,
    handleUpdateUserFavoritePokemons,
    router
) => {
    const response = await fetch('/api/pokemon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pokemonID: pokemonid,
            pokemonName: pokemonName,
        }),
    });

    // If middleware returns a 401, you can redirect to a signup page
    if (response.status === 401) {
        // Redirect or show an error using the router (only option for events handlers)
        router.push('/signup');
    } else if (response.status === 200) {
        const data = await response.json();
        // Update the user state as it was saved successfully
        console.log('User from Avatar List:', data);
        handleUpdateUserFavoritePokemons(data);
    } else {
        // Handle other status codes
        console.error('Failed to save/delete favorite pokemon');
    }
};
