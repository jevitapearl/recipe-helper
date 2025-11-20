import React from 'react';
import { useParams } from 'react-router-dom';
import LocationMap from '../../components/listings/LocationMap';

const ListingDetails = () => {
  const { id } = useParams();
  const listing = {}; // Placeholder for listing data

  return (
    <div className="listing-details">
      <h1>{listing.title}</h1>
      <img src={listing.image} alt={listing.title} />
      <p>{listing.description}</p>
      <p>Price: ${listing.price}</p>
      <LocationMap location={listing.location} />
    </div>
  );
};

export default ListingDetails;
