import React from 'react';

const ListingCard = ({ listing }) => {
  return (
    <div className="listing-card">
      <img src={listing.image} alt={listing.title} />
      <h3>{listing.title}</h3>
      <p>{listing.description}</p>
      <p>Price: ${listing.price}</p>
      <button>View Details</button>
    </div>
  );
};

export default ListingCard;
