import { getListings } from "@/services/admin/guidesManagement";
import Explore from "./Explore";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

export default async function ExplorePage({ searchParams }: PageProps) {
  const queryString = new URLSearchParams(
   searchParams.toString()
  ).toString();

  const listingsResponse = await getListings(queryString);

  const listings = listingsResponse?.data?.data ?? [];

  return (
    <Explore
      initialListings={listings}
      initialFilters={searchParams}
    />
  );
}
