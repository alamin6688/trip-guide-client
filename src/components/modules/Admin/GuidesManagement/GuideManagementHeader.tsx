"use client";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import GuideFormDialog from "./GuideFormDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ICategory } from "@/types/category.interface";
import { Plus } from "lucide-react";

interface GuideManagementHeaderProps {
  categories: ICategory[];
}

const GuidesManagementHeader = ({ categories }: GuideManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <GuideFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        categories={categories || []}
      />

      <ManagementPageHeader
        title="Guides Management"
        description="Manage Guides information and details"
        action={{
          label: "Add Guide",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default GuidesManagementHeader;
