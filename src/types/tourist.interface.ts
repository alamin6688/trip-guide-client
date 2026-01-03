import { IBooking } from "./booking.interface";
import { Gender } from "./guide.interface";
import { IReview } from "./review.interface";

export interface ITourist {
  id?: string;

  email: string;
  name: string;

  gender?: Gender;
  languages: string[];

  profilePhoto?: string | null;
  contactNumber: string;

  address?: string;
  country?: string;
  travelPreferences?: string;

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  bookings?: IBooking[];
  reviews?: IReview[];
}
