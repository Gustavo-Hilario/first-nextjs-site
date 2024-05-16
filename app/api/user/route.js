// pages/api/users.js
import connectDB from '../../lib/mongodb';
import User from '../../lib/Models/User';

export async function GET(Request) {
    let userId = Request.headers.get('x-user-id');

    console.log('User ID:', userId);

    if (!userId) {
        return new Response(
            JSON.stringify(
                {
                    error: 'No user ID found in the request headers. No user is authenticated/logged-in.',
                },
                {
                    status: 401,
                }
            )
        );
    }

    // Extract the USER_ID part from the 'sub' which looks like 'auth0|USER_ID'
    const auth0IdParts = userId.split('|');
    if (auth0IdParts.length < 2) {
        res.status(400).json({ error: 'Invalid user ID format' });
        return;
    }

    userId = auth0IdParts[1]; // This is the USER_ID part after 'auth0|'
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

    let userFound;
    try {
        userFound = await User.findById(objectId);
        console.log('User Found:', userFound);
        return new Response(
            JSON.stringify({
                user: userFound,
            })
        );
    } catch (error) {
        console.error('Error finding user:', error);
        return new Response(JSON.stringify({ error: 'Error finding user' }), {
            status: 500,
        });
    }
}
