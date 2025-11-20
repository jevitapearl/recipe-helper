// src/api/bookingsAPI.js

import apiClient from './apiClient';

// Create a new booking
export const createBooking = async (bookingData) => {
    return apiClient.post('/bookings', bookingData);
};

// Get a user's bookings
export const getMyBookings = async (params = {}) => {
    return apiClient.get('/bookings/me', { params });
};

// Get bookings for a specific listing (for the owner)
export const getListingBookings = async (listingId) => {
    return apiClient.get(`/listings/${listingId}/bookings`);
};

// Cancel a booking
export const cancelBooking = async (bookingId) => {
    return apiClient.patch(`/bookings/${bookingId}/cancel`);
};