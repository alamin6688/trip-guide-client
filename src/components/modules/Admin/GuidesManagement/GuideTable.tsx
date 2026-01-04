"use client";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { ICategory } from "@/types/category.interface";
import { IGuide } from "@/types/guide.interface";
import { toast } from "sonner";
import GuideFormDialog from "./GuideFormDialog";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ManagementTable from "@/components/shared/ManagementTable";
import { guidesColumns } from "./GuideColumns";
import { deleteGuide } from "@/services/admin/guidesManagement";

interface GuidesTableProps {
  guides: IGuide[];
  categories: ICategory[];
}

const GuideTable = ({ guides, categories }: GuidesTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingGuide, setDeletingGuide] = useState<IGuide | null>(null);
  const [viewingGuide, setViewingGuide] = useState<IGuide | null>(null);
  const [editingGuide, setEditingGuide] = useState<IGuide | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (guide: IGuide) => {
    setViewingGuide(guide);
  };

  const handleEdit = (guide: IGuide) => {
    setEditingGuide(guide);
  };

  const handleDelete = (guide: IGuide) => {
    setDeletingGuide(guide);
  };

  const confirmDelete = async () => {
    if (!deletingGuide) return;
    setIsDeleting(true);
    const result = await deleteGuide(deletingGuide.id!);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Guide deleted successfully");
      setDeletingGuide(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete guide");
    }
  };

  return (
    <>
      <ManagementTable
        data={guides}
        columns={guidesColumns}
        // onView={handleView}
        // onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(guide) => guide.id!}
        emptyMessage="No guides found"
      />
      {/* Edit Guide Form Dialog */}
      <GuideFormDialog
        open={!!editingGuide}
        onClose={() => setEditingGuide(null)}
        guide={editingGuide!}
        categories={categories}
        onSuccess={() => {
          setEditingGuide(null);
          handleRefresh();
        }}
      />

      {/* View Doctor Detail Dialog */}
      {/* <DoctorViewDetailDialog
        open={!!viewingDoctor}
        onClose={() => setViewingDoctor(null)}
        doctor={viewingDoctor}
      /> */}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingGuide}
        onOpenChange={(open) => !open && setDeletingGuide(null)}
        onConfirm={confirmDelete}
        title="Delete Guide"
        description={`Are you sure you want to delete ${deletingGuide?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default GuideTable;
