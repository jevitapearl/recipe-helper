import React from 'react';

const ListingFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="listing-filters">
      <input
        type="text"
        placeholder="Search listings..."
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
      />
      <select
        value={filters.category}
        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="room">Room</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
      />
    </div>
  );
};

export default ListingFilters;
