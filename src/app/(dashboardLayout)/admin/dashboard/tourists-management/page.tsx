import { Suspense } from "react";
// import TouristsFilter from "@/components/modules/Admin/TouristsManagement/TouristsFilter";
// import TouristsTable from "@/components/modules/Admin/TouristsManagement/TouristsTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getTourists } from "@/services/admin/touristsManagement";
import TouristsFilter from "@/components/modules/Admin/TouristManagement/TouristsFilter";
import TouristsTable from "@/components/modules/Admin/TouristManagement/TouristsTable";
// import { getTourists } from "@/services/tourists";

const AdminTouristsManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const touristsResult = await getTourists(queryString);

  const totalPages = Math.ceil(
    (touristsResult?.meta?.total || 1) / (touristsResult?.meta?.limit || 1)
  );

  return (
    <div className="space-y-6">
      <ManagementPageHeader
        title="Tourists Management"
        description="Manage all registered tourists"
      />

      <TouristsFilter />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <TouristsTable tourists={touristsResult?.data || []} />
        <TablePagination
          currentPage={touristsResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default AdminTouristsManagementPage;
