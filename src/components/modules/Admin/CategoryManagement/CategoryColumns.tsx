import { Column } from "@/components/shared/ManagementTable";
import { ICategory } from "@/types/category.interface";

export const categoryColumns: Column<ICategory>[] = [
  {
    header: "Icon",
    accessor: (category) => <span className="text-2xl">{category.icon}</span>,
  },
  {
    header: "Title",
    accessor: (category) => category.title,
  },
];
