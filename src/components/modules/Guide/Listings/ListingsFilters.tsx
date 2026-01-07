"use client";

import RefreshButton from "@/components/shared/RefreshButton";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import SearchFilter from "@/components/shared/SearchFilter";

const ListingsFilters = () => {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <RefreshButton />
      </div>

      <div className="flex gap-3 flex-wrap">
        <SearchFilter paramName="city" placeholder="Filter by city" />
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default ListingsFilters;
