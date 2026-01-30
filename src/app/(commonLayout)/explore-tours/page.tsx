import { getListings, getCategories } from "@/services/admin/guidesManagement";
import Explore from "./Explore";
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Record<string, string | undefined>;
}

export default async function ExplorePage(props: { searchParams: Promise<Record<string, string | undefined>> }) {
  const searchParams = await props.searchParams;
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.append(key, value);
    }
  });

  const queryString = params.toString();

  const [listingsResponse, categoriesResponse] = await Promise.all([
    getListings(queryString),
    getCategories()
  ]);

  const listings = listingsResponse?.data?.data ?? [];
  const categories = categoriesResponse?.data ?? [];

  return <Explore initialListings={listings} initialFilters={searchParams} allCategories={categories} />;
}
