import React from 'react';

const BookingCard = ({ booking }) => {
  return (
    <div className="booking-card">
      <h4>{booking.listingTitle}</h4>
      <p>Check-in: {booking.checkIn}</p>
      <p>Check-out: {booking.checkOut}</p>
      <p>Status: {booking.status}</p>
    </div>
  );
};

export default BookingCard;
