import connectDB from '../../lib/mongodb';

export async function POST(request) {
    await connectDB();
    // const user = request.user; // Make sure your environment recognizes this extended property
    // console.log(request); // Log to see the user data

    return Response.json({ message: 'Hello World!' });
}
