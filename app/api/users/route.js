// pages/api/users.js
import clientPromise from '../../lib/mongodb';

export async function POST(Request) {
    try {
        const req = await Request.json();

        // Connect to the database
        const client = await clientPromise;
        const db = client.db('firstnextjs'); // Your database name

        // Insert a new document into the "users" collection
        const user = await db.collection('users').insertOne(req);
        return Response.json(user);
    } catch (error) {
        // Return an error response if something goes wrong
        res.status(500).json({ error: error.message });
    }
}
