import React from 'react';
import BookingCard from '../../components/bookings/BookingCard';

const MyBookings = () => {
  const bookings = []; // Placeholder for bookings data

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
