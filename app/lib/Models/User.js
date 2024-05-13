import { Schema, models, model } from 'mongoose';

const userSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        client_id: String,
        email: String,
        password: String,
        age: Number,
    },
    {
        timestamps: true,
    }
);

// Avoid recompilation of the model if it already exists
const User = models.User || model('User', userSchema);

export default User;
