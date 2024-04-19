export async function getAllPokemons(limit) {
    try {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return []; // Return an empty array in case of error
    }
}

export async function getPokemonDetail(pokemonName) {
    try {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return {}; // Return an empty object in case of error
    }
}
