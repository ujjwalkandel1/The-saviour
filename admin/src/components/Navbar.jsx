import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-red-600 text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">SAVIORS</div> {/* Logo on the left */}
      
      <div className="space-x-4">
        <button className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700">
          Sign In
        </button>
        <button className="px-4 py-2 bg-green-600 rounded-md text-white hover:bg-green-700">
          Sign Up
        </button>
        <button className="px-4 py-2 bg-white rounded-md hover:bg-yellow-600">
        🔔
        </button>
      </div>
    </div>
  );
};

export default Navbar;
