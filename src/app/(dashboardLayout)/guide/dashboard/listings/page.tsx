/* eslint-disable @typescript-eslint/no-explicit-any */
import ListingsFilters from "@/components/modules/Guide/Listings/ListingsFilters";
import ListingsHeader from "@/components/modules/Guide/Listings/ListingsHeader";
import ListingsTable from "@/components/modules/Guide/Listings/ListingsTable";
import TablePagination from "@/components/shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getListings } from "@/services/admin/guidesManagement";

const ListingsPage = async ({ searchParams }: any) => {
  const queryString = queryStringFormatter(await searchParams);
  const res = await getListings(queryString);

  return (
    <div className="space-y-6">
      <ListingsHeader />
      <ListingsFilters />
      <ListingsTable listings={res?.data?.data || []} />
      <TablePagination
        currentPage={res?.data?.meta?.page || 1}
        totalPages={Math.ceil(
          (res?.data?.meta?.total || 1) / (res?.data?.meta?.limit || 1)
        )}
      />
    </div>
  );
};

export default ListingsPage;
