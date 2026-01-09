"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const TouristsFilter = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search tourists..." />
        <RefreshButton />
      </div>
      <div className="flex items-center gap-3">
        <SearchFilter paramName="email" placeholder="Email" />
        <SearchFilter paramName="contactNumber" placeholder="Contact" />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default TouristsFilter;
