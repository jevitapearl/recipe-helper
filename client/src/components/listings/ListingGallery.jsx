import React from 'react';
import ListingCard from './ListingCard';

const ListingGallery = ({ listings }) => {
  return (
    <div className="listing-gallery">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingGallery;
