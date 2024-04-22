import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
    },
    {
        timestamps: true,
    }
);

// Avoid recompilation of the model if it already exists
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
