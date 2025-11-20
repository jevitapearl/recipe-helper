import React, { useState } from 'react';
import ListingGallery from '../../components/listings/ListingGallery';
import ListingFilters from '../../components/listings/ListingFilters';

const ListingsPage = () => {
  const [filters, setFilters] = useState({ search: '', category: '', minPrice: '', maxPrice: '' });
  const listings = []; // Placeholder for listings data

  const filteredListings = listings.filter((listing) => {
    // Apply filters logic here
    return true;
  });

  return (
    <div className="listings-page">
      <h1>Listings</h1>
      <ListingFilters filters={filters} onFilterChange={setFilters} />
      <ListingGallery listings={filteredListings} />
    </div>
  );
};

export default ListingsPage;
