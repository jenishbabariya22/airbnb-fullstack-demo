import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Header onSearch={() => { }} /> {/* Pass a dummy function for now */}
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to Hotel Booking</h1>
        <p className="text-center text-lg mb-4">
          Discover and book your perfect hotel at the best prices.
        </p>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/600x300" // Replace with an actual image URL
            alt="Hotel"
            className="rounded-lg shadow-lg"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
