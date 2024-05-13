import connectDB from '../../lib/mongodb';
import User from '../../lib/Models/User';

export async function POST(request) {
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

    // Ensure the userId is converted to ObjectId
    let objectId;
    try {
        objectId = new mongoose.Types.ObjectId(userId);
    } catch (error) {
        console.error('Error converting userId to ObjectId:', error);
        return new Response(JSON.stringify({ error: 'Invalid user ID' }), {
            status: 400,
        });
    }

    const newUser = await mongoose.model('User').findOne({
        _id: objectId,
    });

    return Response.json({ message: 'Hello World!' });
}
