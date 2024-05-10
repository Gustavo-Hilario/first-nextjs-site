import { Schema, models, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: String,
        age: Number,
    },
    {
        timestamps: true,
    }
);

// Avoid recompilation of the model if it already exists
const User = models.User || model('User', userSchema);

export default User;
