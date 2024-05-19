import connectDB from '../../lib/mongodb';
import User from '../../lib/Models/User';

export async function POST(request) {
    const pokemon = await request.json();
    console.log(pokemon);
    // Accessing the user ID from the request headers
    let userId = request.headers.get('x-user-id');

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
        });
    }

    // Extract the USER_ID part from the 'sub' which looks like 'auth0|USER_ID'
    const auth0IdParts = userId.split('|');
    if (auth0IdParts.length < 2) {
        res.status(400).json({ error: 'Invalid user ID format' });
        return;
    }

    userId = auth0IdParts[1]; // This is the USER_ID part after 'auth0|'

    // Returns a connection to the MongoDB database with the Mongoose connection
    const mongoose = await connectDB();

    // LEARN: Ensure the userId is converted to ObjectId
    let objectId;
    try {
        objectId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
        console.error('Error converting userId to ObjectId:', error);
        return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
            status: 400,
        });
    }

    let foundUser;
    try {
        foundUser = await mongoose.model('User').findOne({
            _id: objectId,
        });
    } catch (error) {
        console.error('Error finding user:', error);
        return new Response(JSON.stringify({ error: 'Error finding user' }), {
            status: 500,
        });
    }

    try {
        // Check if the pokemon already exists in the user's favorites. If it does, remove it
        const exists = foundUser.favoritePokemons.some(
            (favPokemon) => favPokemon.id === pokemon.pokemonID
        );
        if (exists) {
            // Remove the pokemon from the favorites
            const favPokemons = foundUser.favoritePokemons.filter(
                (favPokemon) => favPokemon.id !== pokemon.pokemonID
            );

            // Update the user's favoritePokemons array
            foundUser.favoritePokemons = favPokemons;
            foundUser.save();
            console.log(
                'Pokemon already exists. Removed it from favorites. All favorites:',
                foundUser.favoritePokemons
            );
        } else {
            // Add the pokemon to the favorites
            foundUser.favoritePokemons.push({
                id: pokemon.pokemonID,
                name: pokemon.pokemonName,
            });

            // Update the user's favoritePokemons array
            foundUser.save();
            // console.log(
            //     'Pokemon added to favorites. All favorites:',
            //     foundUser.favoritePokemons
            // );
        }
    } catch (error) {
        console.error('Error finding user:', error);
        return new Response(JSON.stringify({ error: 'Error finding user' }), {
            status: 500,
        });
    }

    // console.log('Found user:', foundUser);

    return Response.json(foundUser);
}
