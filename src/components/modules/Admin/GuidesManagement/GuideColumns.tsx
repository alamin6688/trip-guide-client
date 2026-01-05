/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { IGuide } from "@/types/guide.interface";
import { Star } from "lucide-react";

export const guidesColumns: Column<IGuide>[] = [
  {
    header: "Guide",
    accessor: (guide) => (
      <UserInfoCell
        name={guide.name}
        email={guide.email}
        photo={guide.profilePhoto as string}
      />
    ),
    sortKey: "name",
  },
  // {
  //   header: "Categories",
  //   accessor: (guide) => {
  //     if (!guide.guideCategories || guide.guideCategories.length === 0) {
  //       console.log(guide.guideCategories);

  //       return <span className="text-xs text-gray-500">No categories</span>;
  //     }

  //     return (
  //       <div className="flex flex-wrap gap-1">
  //         {guide.guideCategories.map((gc, index) => (
  //           <span
  //             key={gc.categoryId || index}
  //             className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  //           >
  //             {gc.category?.icon && <span>{gc.category.icon}</span>}
  //             {gc.category?.title || "N/A"}
  //           </span>
  //         ))}
  //       </div>
  //     );
  //   },
  // },
  {
    header: "Contact",
    accessor: (guide) => <span className="text-sm">{guide.contactNumber}</span>,
  },
  {
    header: "Experience",
    accessor: (guide) => (
      <span className="text-sm font-medium">{guide.experience} yrs</span>
    ),
    sortKey: "experience",
  },
  {
    header: "Rate",
    accessor: (guide) => (
      <span className="text-sm font-semibold text-green-600">
        ${guide.dailyRate}
      </span>
    ),
    sortKey: "dailyRate",
  },
  {
    header: "Rating",
    accessor: (guide) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {guide.averageRating.toFixed(1)}
        </span>
      </div>
    ),
    sortKey: "averageRating",
  },
  {
    header: "Gender",
    accessor: (guide) => (
      <span className="text-sm capitalize">{guide.gender.toLowerCase()}</span>
    ),
  },
  {
    header: "Status",
    accessor: (guide) => <StatusBadgeCell isDeleted={guide.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (guide) => <DateCell date={guide.createdAt} />,
    sortKey: "createdAt",
  },
];
