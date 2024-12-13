import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">User Dashboard</h1>
      
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Phone number</th>
            <th className="px-4 py-2 border">SOS Message</th>
            <th className="px-4 py-2 border">Location</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{user.username}</td>
              <td className="px-4 py-2 border">{user.phone}</td>
              <td className="px-4 py-2 border">{user.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
