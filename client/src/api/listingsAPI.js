// src/api/listingsAPI.js

import apiClient from './apiClient';

// Fetch all listings (with optional filters/pagination)
export const getAllListings = async (params = {}) => {
    return apiClient.get('/listings', { params });
};

// Fetch a single listing by ID
export const getListingById = async (listingId) => {
    return apiClient.get(`/listings/${listingId}`);
};

// Create a new listing
export const createListing = async (listingData) => {
    // Note: If you're uploading files, you may need to use FormData
    return apiClient.post('/listings', listingData);
};

// Update an existing listing
export const updateListing = async (listingId, listingData) => {
    return apiClient.put(`/listings/${listingId}`, listingData);
};

// Delete a listing
export const deleteListing = async (listingId) => {
    return apiClient.delete(`/listings/${listingId}`);
};