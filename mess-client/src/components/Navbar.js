import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold">GitHub</span>
        <input
          type="text"
          placeholder="Search or jump to..."
          className="bg-gray-800 border border-gray-700 text-sm px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <a href="#" className="hover:underline text-sm">Pull requests</a>
        <a href="#" className="hover:underline text-sm">Issues</a>
        <a href="#" className="hover:underline text-sm">Marketplace</a>
        <a href="#" className="hover:underline text-sm">Explore</a>
      </div>
      <div className="flex items-center space-x-4 text-sm">
        <button className="hover:underline">Sign in</button>
        <button className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Sign up</button>
      </div>
    </nav>
  );
};

export default Navbar;
