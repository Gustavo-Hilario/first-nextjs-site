import { Schema, models, model } from 'mongoose';

const favoritePokemons = new Schema({
    id: Number,
    name: String,
});

const savedSites = new Schema({
    id: Number,
    url: String,
});

const userSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        client_id: String,
        email: String,
        password: String,
        age: Number,
        favoritePokemons: [favoritePokemons],
        favWPComSites: [savedSites],
    },
    {
        timestamps: true,
    }
);

// Avoid recompilation of the model if it already exists
const User = models.User || model('User', userSchema);

export default User;
