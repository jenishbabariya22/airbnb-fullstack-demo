import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div>
      <Header onSearch={() => { }} /> {/* Pass a dummy function for now */}
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg mb-4">
          We are a leading hotel booking platform dedicated to providing you with the best hotel options tailored to your needs.
        </p>
        <p className="text-lg mb-4">
          Our mission is to make your travel experiences enjoyable and hassle-free. We partner with the best hotels around the world to bring you exclusive offers.
        </p>
        <p className="text-lg mb-4">
          Join us on your next adventure and explore the world of comfort and luxury!
        </p>

        {/* Blog Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <article className="bg-gray-100 p-4 rounded-lg mb-6 shadow-md">
            <h3 className="text-xl font-semibold">5 Tips for Booking the Perfect Hotel</h3>
            <p className="text-gray-700 mb-2">
              Discover essential tips to find the perfect accommodation for your travels.
            </p>
            <a href="#" className="text-blue-500 hover:underline">Read More</a>
          </article>
          <article className="bg-gray-100 p-4 rounded-lg mb-6 shadow-md">
            <h3 className="text-xl font-semibold">Exploring Destinations: Top Picks for 2024</h3>
            <p className="text-gray-700 mb-2">
              Check out our favorite destinations for 2024 that offer amazing experiences and sights.
            </p>
            <a href="#" className="text-blue-500 hover:underline">Read More</a>
          </article>
          <article className="bg-gray-100 p-4 rounded-lg mb-6 shadow-md">
            <h3 className="text-xl font-semibold">How to Travel on a Budget</h3>
            <p className="text-gray-700 mb-2">
              Learn how to save money while traveling without compromising on comfort and enjoyment.
            </p>
            <a href="#" className="text-blue-500 hover:underline">Read More</a>
          </article>
        </section>

        {/* Contact Information Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg mb-2">
            If you have any questions, feel free to reach out to us through the following:
          </p>
          <ul className="list-disc ml-6 text-lg">
            <li>Email: <a href="mailto:support@hotelbooking.com" className="text-blue-500 hover:underline">support@hotelbooking.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a></li>
            <li>Address: 123 Hotel Street, Travel City, CA 90210</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default About;
