import { UserRole } from "@/lib/auth-utils";
import { IAdmin } from "./admin.interface";

import { ITourist } from "./tourist.interface";
import { IGuide } from "./guide.interface";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: "ACTIVE" | "BLOCKED" | "DELETED";
  admin?: IAdmin;
  tourist?: ITourist;
  guide?: IGuide;
  createdAt: string;
  updatedAt: string;
}
