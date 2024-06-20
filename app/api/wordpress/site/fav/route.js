'use server';

import connectDB from '../../../../lib/mongodb';
import User from '../../../../lib/Models/User';

export async function POST(request) {
    // const site = params.site;
    const { siteID, siteURL } = await request.json();
    // console.log(siteID);

    // Accessing the user ID from the request headers
    let userId = request.headers.get('x-user-id');

    // Extract the USER_ID part from the 'sub' which looks like 'auth0|USER_ID'
    const auth0IdParts = userId.split('|');
    if (auth0IdParts.length < 2) {
        res.status(400).json({ error: 'Invalid user ID format' });
        return;
    }

    userId = auth0IdParts[1]; // This is the USER_ID part after 'auth0|'
    // console.log('userId:', userId);

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
        // return foundUser
        // console.log('foundUser:', foundUser);
        // return new Response(JSON.stringify({ foundUser }));
    } catch (error) {
        console.error('Error finding user:', error);
        return new Response(JSON.stringify({ error: 'Error finding user' }), {
            status: 500,
        });
    }

    // Saving the favorite site to the user's favorites
    try {
        // Check if the site already exists in the user's favorites. If it does, remove it
        const exists = foundUser.favWPComSites.some(
            (favsite) => favsite.id === siteID
        );
        console.log('Site exists:', exists);
        if (exists) {
            // Remove the site from the favorites
            const favWPsites = foundUser.favWPComSites.filter(
                (favsite) => favsite.id !== siteID
            );

            console.log('favWPsites:', favWPsites);

            // Update the user's favorite sites array
            foundUser.favWPComSites = favWPsites;
            foundUser.save();
            console.log(
                'Site is already fav. Removed it from favorites. All favorites:',
                foundUser.favWPComSites
            );
        } else {
            // Add the site to the favorites
            foundUser.favWPComSites.push({
                id: siteID,
                url: siteURL,
            });

            console.log('Site added to favorites:', foundUser.favWPComSites);

            foundUser.save();
        }
    } catch (error) {
        // console.error('Error handling favorite sites:', error);
        return new Response(
            JSON.stringify({ error: 'Error handling favorite sites' }),
            {
                status: 500,
            }
        );
    }

    const user = {
        id: foundUser._id,
        email: foundUser.email,
        favWPComSites: foundUser.favWPComSites,
    };

    console.log('User:', user);
    return Response.json(user);
}
