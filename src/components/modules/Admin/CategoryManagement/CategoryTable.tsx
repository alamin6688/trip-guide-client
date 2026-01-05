"use client";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { deleteCategory } from "@/services/admin/guidesManagement";
// import { deleteCategory } from "@/services/category/category.service";
import { ICategory } from "@/types/category.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { categoryColumns } from "./CategoryColumns";
// import { categoryColumns } from "./categoryColumns";

interface CategoryTableProps {
  categories: ICategory[];
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deleting, setDeleting] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deleting) return;

    setLoading(true);
    const result = await deleteCategory(deleting.id);
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setDeleting(null);
      refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={categories}
        columns={categoryColumns}
        // onDelete={setDeleting}
        getRowKey={(cat) => cat.id}
        emptyMessage="No categories found"
      />

      <DeleteConfirmationDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${deleting?.title}"?`}
        isDeleting={loading}
      />
    </>
  );
};

export default CategoryTable;
