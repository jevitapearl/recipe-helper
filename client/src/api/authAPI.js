// src/api/authAPI.js

import apiClient from './apiClient';

// User registration
export const registerUser = async (userData) => {
    return apiClient.post('/auth/register', userData);
};

// User login
export const loginUser = async (credentials) => {
    return apiClient.post('/auth/login', credentials);
};

// Fetch current authenticated user's profile
export const getProfile = async () => {
    return apiClient.get('/auth/me');
};

// Request password reset (sends email)
export const forgotPassword = async (email) => {
    return apiClient.post('/auth/forgot-password', { email });
};