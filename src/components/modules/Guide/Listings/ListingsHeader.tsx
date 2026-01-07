"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useState } from "react";
import ListingFormDialog from "./ListingFormDialog";

const ListingsHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ListingFormDialog open={open} onClose={() => setOpen(false)} />

      <ManagementPageHeader
        title="Listings"
        description="Manage your tours and experiences"
        action={{
          label: "Add Listing",
          icon: Plus,
          onClick: () => setOpen(true),
        }}
      />
    </>
  );
};

export default ListingsHeader;
