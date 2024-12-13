import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-5">
      <div className="space-y-4">
        <Link to="/" className="block p-2 hover:bg-red-600 rounded-md">
          Dashboard
        </Link>
        <Link to="/users" className="block p-2 hover:bg-red-600 rounded-md">
          Users
        </Link>
        <Link to="/settings" className="block p-2 hover:bg-red-600 rounded-md">
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
