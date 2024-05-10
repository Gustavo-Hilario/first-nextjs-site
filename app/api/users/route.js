// pages/api/users.js
import connectDB from '../../lib/mongodb';
import User from '../../lib/Models/User';

export async function POST(Request) {
    try {
        const { name, age } = await Request.json();
        await connectDB();

        const person = new User({
            name: name,
            age: age,
        });

        await person.save();

        return Response.json({ name, age });
    } catch (error) {
        // Return an error response if something goes wrong
        return Response.json({ error: error.message });
    }
}
