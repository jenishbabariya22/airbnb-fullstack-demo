import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { FaSwimmingPool, FaWifi, FaSpa, FaParking } from 'react-icons/fa';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    pricePerNight: '',
    rating: '',
    images: [],
    amenities: '',
  });
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  // Fetch hotels from API
  const fetchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hotels');
      setHotels(response.data);
      setFilteredHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  // Add new hotel
  const handleAddHotel = async () => {
    try {
      const amenitiesArray = newHotel.amenities.split(',').map((amenity) => amenity.trim());
      const hotelToAdd = { ...newHotel, amenities: amenitiesArray };

      await axios.post('http://localhost:5000/api/hotels', hotelToAdd);
      fetchHotels();
      setNewHotel({ name: '', location: '', pricePerNight: '', rating: '', images: [], amenities: '' });
    } catch (error) {
      console.error('Error adding hotel:', error);
    }
  };

  const handleSearch = (term) => {
    filterHotels(term, selectedAmenities, minPrice, maxPrice);
  };

  const handleAmenitiesChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
    filterHotels('', [...selectedAmenities, amenity], minPrice, maxPrice);
  };

  const filterHotels = (term, amenities, minPrice, maxPrice) => {
    let filtered = hotels;

    if (term) {
      filtered = filtered.filter((hotel) =>
        hotel.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (amenities.length > 0) {
      filtered = filtered.filter((hotel) => {
        const hotelAmenities = Array.isArray(hotel.amenities) ? hotel.amenities : [];
        return amenities.every((amenity) => hotelAmenities.includes(amenity));
      });
    }

    if (minPrice || maxPrice) {
      filtered = filtered.filter((hotel) => {
        const price = parseFloat(hotel.pricePerNight);
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredHotels(filtered);
  };

  const handleAddToCart = (hotel, adultsCount, childrenCount) => {
    try {
      const cartData = JSON.parse(localStorage.getItem('cart')) || [];
      const isAlreadyInCart = cartData.some((item) => item._id === hotel._id && item.adults === adultsCount && item.children === childrenCount);

      if (isAlreadyInCart) {
        alert('This hotel is already in the cart with the same booking details!');
      } else {
        cartData.push({ ...hotel, adults: adultsCount, children: childrenCount });
        localStorage.setItem('cart', JSON.stringify(cartData));
        alert('Hotel added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Hotel Listings</h1>

        {/* Amenities Filter */}
        <div className="mb-4 p-4 border border-gray-300 rounded shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Filter by Amenities:</h2>
          <div className="flex flex-wrap">
            <label className="flex items-center mr-4">
              <input
                type="checkbox"
                value="Pool"
                onChange={() => handleAmenitiesChange('Pool')}
                className="mr-2"
              />
              <FaSwimmingPool className="text-blue-500" /> Pool
            </label>
            <label className="flex items-center mr-4">
              <input
                type="checkbox"
                value="WiFi"
                onChange={() => handleAmenitiesChange('WiFi')}
                className="mr-2"
              />
              <FaWifi className="text-blue-500" /> WiFi
            </label>
            <label className="flex items-center mr-4">
              <input
                type="checkbox"
                value="Spa"
                onChange={() => handleAmenitiesChange('Spa')}
                className="mr-2"
              />
              <FaSpa className="text-blue-500" /> Spa
            </label>
            <label className="flex items-center mr-4">
              <input
                type="checkbox"
                value="Parking"
                onChange={() => handleAmenitiesChange('Parking')}
                className="mr-2"
              />
              <FaParking className="text-blue-500" /> Parking
            </label>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-4 p-4 border border-gray-300 rounded shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Filter by Price Range:</h2>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border p-2 mr-2 mb-2 sm:mb-0 w-full sm:w-32"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border p-2 mr-2 mb-2 sm:mb-0 w-full sm:w-32"
            />
            <button
              onClick={() => filterHotels('', selectedAmenities, minPrice, maxPrice)}
              className="bg-blue-500 text-white p-2"
            >
              Apply
            </button>
          </div>
        </div>

        {/* New Hotel Form */}
        <div className="mb-6 flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Name"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            className="border p-2 mr-2 mb-2 md:mb-0 w-full md:w-1/6"
          />
          <input
            type="text"
            placeholder="Location"
            value={newHotel.location}
            onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
            className="border p-2 mr-2 mb-2 md:mb-0 w-full md:w-1/6"
          />
          <input
            type="number"
            placeholder="Price per Night"
            value={newHotel.pricePerNight}
            onChange={(e) => setNewHotel({ ...newHotel, pricePerNight: e.target.value })}
            className="border p-2 mr-2 mb-2 md:mb-0 w-full md:w-1/6"
          />
          <input
            type="number"
            placeholder="Rating"
            value={newHotel.rating}
            onChange={(e) => setNewHotel({ ...newHotel, rating: e.target.value })}
            className="border p-2 mr-2 mb-2 md:mb-0 w-full md:w-1/6"
          />
          <input
            type="text"
            placeholder="Image URLs (comma separated)"
            value={newHotel.images.join(', ')}
            onChange={(e) => setNewHotel({ ...newHotel, images: e.target.value.split(', ') })}
            className="border p-2 mr-2 mb-2 md:mb-0 w-full md:w-2/6"
          />
          <input
            type="text"
            placeholder="Amenities (comma separated)"
            value={newHotel.amenities}
            onChange={(e) => setNewHotel({ ...newHotel, amenities: e.target.value })}
            className="border p-2 mr-2 mb-2 md:mb-0 w-full md:w-2/6"
          />
          <button onClick={handleAddHotel} className="bg-green-500 text-white p-2 mt-2 md:mt-0">
            Add Hotel
          </button>
        </div>

        {/* Hotel List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHotels.map((hotel) => (
            <div key={hotel._id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">

              {/* Input Fields for Adults and Children */}
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Adults"
                  min="1"
                  defaultValue="1"
                  className="border p-2 mr-2 mb-2 "
                  id={`adults-${hotel._id}`}
                />
                <h3>Adult</h3>

                <div>

                  <input
                    type="number"
                    placeholder="Children"
                    min="0"
                    defaultValue="0"
                    className="border p-2 mr-2 mb-2 "
                    id={`children-${hotel._id}`}
                  />
                  <h3>Children</h3>
                </div>
              </div>

              <img src={hotel.images[0]} alt={hotel.name} className="w-full h-48 object-cover rounded-md mb-2" />
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="text-gray-800 font-bold">${hotel.pricePerNight} per night</p>
              <p className="text-yellow-500">{`⭐ ${hotel.rating}`}</p>

              <button
                onClick={() => {
                  const adultsCount = parseInt(document.getElementById(`adults-${hotel._id}`).value) || 1;
                  const childrenCount = parseInt(document.getElementById(`children-${hotel._id}`).value) || 0;
                  handleAddToCart(hotel, adultsCount, childrenCount);
                }}
                className="bg-blue-500 text-white p-2 w-full mt-4"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/cart')}
          className="bg-green-500 text-white p-2 mt-4"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default HotelList;
