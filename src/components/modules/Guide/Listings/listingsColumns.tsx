/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";

export const listingsColumns: Column<any>[] = [
  {
    header: "Title",
    accessor: (row) => <span className="font-medium">{row.title}</span>,
  },
  {
    header: "Itinerary",
    accessor: (row) => <span className="font-medium">{row.itinerary}</span>,
  },
  {
    header: "City",
    accessor: (row) => row.city,
  },
  {
    header: "Meeting Point",
    accessor: (row) => row.meetingPoint,
  },
  {
    header: "Max Group Size",
    accessor: (row) => `${row.maxGroupSize} people`,
  },
  {
    header: "Price",
    accessor: (row) => `$${row.price}`,
  },
  {
    header: "Category",
    accessor: (row) => row.categories?.title || "N/A",
  },
  {
    header: "Languages",
    accessor: (row) =>
      row.languages && row.languages.length > 0
        ? row.languages.join(", ")
        : "None",
  },
  {
    header: "Duration",
    accessor: (row) => `${row.durationHours} hrs`,
  },
  {
    header: "Description",
    accessor: (row) => `${row.description}`,
  },
  //   {
  //     header: "Bookings",
  //     accessor: (row) => `${row.bookingsCount || 0} bookings`,
  //   },
  {
    header: "Status",
    accessor: (row) =>
      row.isActive ? (
        <Badge variant="outline" className="bg-blue-600 text-white">
          Active
        </Badge>
      ) : (
        <Badge variant="outline" className="bg-gray-400 text-white">
          Inactive
        </Badge>
      ),
  },
];
