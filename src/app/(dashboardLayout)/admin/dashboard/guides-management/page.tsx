
/* eslint-disable @typescript-eslint/no-explicit-any */
import GuideFilters from "@/components/modules/Admin/GuidesManagement/GuideFilters";
import GuidesManagementHeader from "@/components/modules/Admin/GuidesManagement/GuideManagementHeader";
import GuideTable from "@/components/modules/Admin/GuidesManagement/GuideTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getGuides } from "@/services/admin/guidesManagement";
import { Suspense } from "react";

const GuidesManagement = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const guidesResult = await getGuides(queryString);
  console.log(guidesResult);

  const guides = guidesResult?.data || [];

  console.log(guides);

  const totalPages = Math.ceil(
    (guidesResult?.meta?.total || 1) / (guidesResult?.meta?.limit || 1)
  );

  // TODO: Fetch categories from API
  const categories = { data: [] };

  return (
    <div className="space-y-6">
      <GuidesManagementHeader categories={categories?.data || []} />
      <GuideFilters categories={categories?.data || []} />
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <GuideTable guides={guides} categories={categories?.data || []} />
        <TablePagination
          currentPage={guidesResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        />
      </Suspense>
    </div>
  );
};

export default GuidesManagement;
