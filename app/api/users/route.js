// pages/api/users.js
import connectDB from '../../lib/mongodb';
import User from '../../../Models/User';

export async function POST(Request) {
    try {
        const { name, email } = await Request.json();
        await connectDB();

        const person = new User({
            name: name,
            email: email,
        });

        await person.save();

        // // Connect to the database
        // const client = await clientPromise();

        // const db = client.db('firstnextjs'); // Your database name

        // // Insert a new document into the "users" collection
        // const user = await db.collection('users').insertOne(req);
        return Response.json('Test');
    } catch (error) {
        // Return an error response if something goes wrong
        res.status(500).json({ error: error.message });
    }
}
