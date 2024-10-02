import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
  }, []);

  const handleDeleteBooking = (hotelId) => {
    const updatedCart = cart.filter((item) => item._id !== hotelId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, hotel) => {
      return total + hotel.pricePerNight * (hotel.adults + hotel.children);
    }, 0);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cart.map((hotel) => (
                <div key={hotel._id} className="border rounded-lg shadow-lg p-4">
                  <img src={hotel.images[0]} alt={hotel.name} className="w-full h-32 object-cover rounded" />
                  <h3 className="text-lg font-bold mt-2">{hotel.name}</h3>
                  <p>Location: {hotel.location}</p>
                  <p>Price per night: ₹{hotel.pricePerNight}</p>
                  <p>Adults: {hotel.adults}</p>
                  <p>Children: {hotel.children}</p>
                  <p>Total for this booking: ₹{hotel.pricePerNight * (hotel.adults + hotel.children)}</p>
                  <button
                    onClick={() => handleDeleteBooking(hotel._id)}
                    className="bg-red-500 text-white p-2 mt-2"
                  >
                    Delete Booking
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-bold">Total Price: ₹{calculateTotalPrice()}</h2>
            </div>
          </div>
        )}
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white p-2 mt-4"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
