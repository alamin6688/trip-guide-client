"use client";

import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CategoryFormDialog from "./CategoryFormDialog";

const CategoryManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <CategoryFormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Guide Categories"
        description="Manage guide service categories"
        action={{
          label: "Add Category",
          icon: Plus,
          onClick: () => setOpen(true),
        }}
      />
    </>
  );
};

export default CategoryManagementHeader;
