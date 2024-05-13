import { Schema, models, model } from 'mongoose';

const pokemonSchema = new Schema({
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});
