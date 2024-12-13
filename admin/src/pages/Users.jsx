import React, { useState } from 'react';

const Users = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    phone: '',
    content: ''
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      alert('User added successfully!');
      setNewUser({ username: '', phone: '', content: '' }); // Clear form
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">Manage Users</h1>
      
      <form onSubmit={handleAddUser} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="p-2 border w-full"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            className="p-2 border w-full"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700">Content</label>
          <input
            type="text"
            className="p-2 border w-full"
            value={newUser.content}
            onChange={(e) => setNewUser({ ...newUser, content: e.target.value })}
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Add User
        </button>
      </form>
    </div>
  );
};

export default Users;
