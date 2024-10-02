import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value); // Call the search function passed from HotelList
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-2 md:mb-0">Hotel Booking</h1>
        <nav className="flex items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Hotels..."
            onChange={handleSearch} // Update search as the user types
            className="border p-2 rounded-l-md text-black w-full md:w-48"
          />
          <ul className="flex space-x-4 ml-4">
            <li><Link to={'/'} className="hover:underline">Home</Link></li>
            <li><Link to={'/about'} className="hover:underline">About</Link></li>
            <li><Link to={'/contact'} className="hover:underline">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
