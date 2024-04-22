// components/UserForm.js
import React, { useState } from 'react';

function UserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Send the user data to the server
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email }),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert('User added successfully!');
        } else {
            console.error('Failed to add user:', data.error);
            alert('Failed to add user.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <label htmlFor='email'>Email:</label>
            <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type='submit'>Add User</button>
        </form>
    );
}

export default UserForm;
