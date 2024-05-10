'use client';

import { set } from 'mongoose';
import { useState } from 'react';
export default function MongoUser() {
    const [user, setUser] = useState({});
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name: e.target[0].value,
            age: e.target[1].value,
        };

        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const savedUser = await response.json();
        setUser(savedUser);
    };

    return (
        <div>
            <h1>Users</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <input type='text' placeholder='Name' />
                <input type='number' placeholder='Age' />
                <button type='submit'>Submit</button>
            </form>
            {Object.keys(user).length > 0 && (
                <div>
                    <h2>Saved user on the database</h2>
                    <p>Name: {user.name}</p>
                    <p>Age: {user.age}</p>
                </div>
            )}
        </div>
    );
}
