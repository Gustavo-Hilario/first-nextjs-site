// // pages/api/data.js
// import clientPromise from '../lib/mongodb';

// export default async function handler(req, res) {
//     try {
//         const client = await clientPromise;
//         const db = client.db('firstnextjs'); // Replace "mydatabase" with your database name

//         const data = await db
//             .collection('users')
//             .insert('Test from NextJS site')
//             .toArray(); // Replace "mycollection"
//         res.status(200).json(data);
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// }
