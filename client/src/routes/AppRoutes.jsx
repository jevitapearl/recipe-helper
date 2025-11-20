import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ListingsPage from '../pages/Listings/ListingsPage';
import ListingDetails from '../pages/Listings/ListingDetails';
import CreateListing from '../pages/Listings/CreateListing';
import MyBookings from '../pages/Bookings/MyBookings';
import BookingSuccess from '../pages/Bookings/BookingSuccess';
import ProfilePage from '../pages/Profile/ProfilePage';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listings" element={<ListingsPage />} />
      <Route path="/listings/:id" element={<ListingDetails />} />
      <Route path="/create-listing" element={<CreateListing />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/booking-success" element={<BookingSuccess />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
