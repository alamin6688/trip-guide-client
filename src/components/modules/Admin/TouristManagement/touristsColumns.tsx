import { Column } from "@/components/shared/ManagementTable";
import { ITourist } from "@/types/tourist.interface";
import { DateCell } from "@/components/shared/cell/DateCell";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";

export const touristsColumns: Column<ITourist>[] = [
  {
    header: "Tourist",
    accessor: (tourist) => (
      <UserInfoCell
        name={tourist.name}
        email={tourist.email}
        photo={tourist.profilePhoto}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Contact",
    accessor: (tourist) => <span>{tourist.contactNumber || "N/A"}</span>,
  },
  {
    header: "Country",
    accessor: (tourist) => <span>{tourist.country || "N/A"}</span>,
  },
  {
    header: "Status",
    accessor: (tourist) => <StatusBadgeCell isDeleted={tourist.isDeleted} />,
  },
  {
    header: "Joined",
    accessor: (tourist) => <DateCell date={tourist.createdAt} />,
    sortKey: "createdAt",
  },
];
