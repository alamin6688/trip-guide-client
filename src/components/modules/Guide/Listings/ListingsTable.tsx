/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { listingsColumns } from "./listingsColumns";
import { deleteListing } from "@/services/admin/guidesManagement";

const ListingsTable = ({ listings }: { listings: any[] }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const confirmDelete = async () => {
    if (!deleting?.id) return;

    setLoading(true);
    const res = await deleteListing(deleting.id);
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      setDeleting(null);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={listings}
        columns={listingsColumns}
        onDelete={(row) => setDeleting(row)}
        getRowKey={(row) => row.id}
        emptyMessage="No listings found"
      />

      <DeleteConfirmationDialog
        open={!!deleting}
        onOpenChange={() => setDeleting(null)}
        onConfirm={confirmDelete}
        isDeleting={loading}
        title="Delete Listing"
        description="This listing will be permanently deleted."
      />
    </>
  );
};

export default ListingsTable;
