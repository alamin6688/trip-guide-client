"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ITourist } from "@/types/tourist.interface";
import TouristFormDialog from "./TouristFormDialog";
import TouristViewDetailDialog from "./TouristViewDetailDialog";
import { touristsColumns } from "./touristsColumns";
import { deleteTourist } from "@/services/admin/touristsManagement";

interface ITouristsTableProps {
  tourists: ITourist[];
}

const TouristsTable = ({ tourists }: ITouristsTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [editingTourist, setEditingTourist] = useState<ITourist | null>(null);
  const [viewingTourist, setViewingTourist] = useState<ITourist | null>(null);
  const [deletingTourist, setDeletingTourist] = useState<ITourist | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => startTransition(() => router.refresh());

  const confirmDelete = async () => {
    if (!deletingTourist) return;
    setIsDeleting(true);
    const result = await deleteTourist(deletingTourist.id);
    setIsDeleting(false);
    if (result.success) {
      toast.success(result.message || "Deleted successfully");
      setDeletingTourist(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete");
    }
  };

  return (
    <>
      <ManagementTable
        data={tourists}
        columns={touristsColumns}
        onView={setViewingTourist}
        onEdit={setEditingTourist}
        onDelete={setDeletingTourist}
        getRowKey={(tourist) => tourist.id}
        emptyMessage="No tourists found"
      />

      <TouristFormDialog
        open={!!editingTourist}
        tourist={editingTourist}
        onClose={() => setEditingTourist(null)}
        onSuccess={() => {
          setEditingTourist(null);
          handleRefresh();
        }}
      />

      <TouristViewDetailDialog
        open={!!viewingTourist}
        tourist={viewingTourist}
        onClose={() => setViewingTourist(null)}
      />

      <DeleteConfirmationDialog
        open={!!deletingTourist}
        onOpenChange={(open) => !open && setDeletingTourist(null)}
        onConfirm={confirmDelete}
        title="Delete Tourist"
        description={`Are you sure you want to delete ${deletingTourist?.name}?`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default TouristsTable;
