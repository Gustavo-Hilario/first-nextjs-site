import { Schema, models, model } from 'mongoose';

const favPokemonsSchema = new Schema({
    favorites: [
        {
            name: String,
            url: String,
            ref: 'User',
        },
    ],
});

export default models.favoritePokemons ||
    model('favoritePokemons', favPokemonsSchema);
