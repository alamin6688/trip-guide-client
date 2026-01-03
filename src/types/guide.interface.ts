import { IBooking } from "./booking.interface";
import { IGuideCategory } from "./guideCategory.interface";
import { IListing } from "./listing.interface";
import { IReview } from "./review.interface";

export type Gender = "MALE" | "FEMALE";

export interface IGuide {
  id?: string;

  name: string;
  email: string;
  password?: string;
  languages: string[];

  profilePhoto?: File | string;
  contactNumber: string;
  address?: string;

  gender: Gender;
  bio?: string;

  city: string;
  country: string;

  dailyRate: number;
  experience: number;
  averageRating: number;

  isDeleted?: boolean;

  createdAt?: string;
  updatedAt?: string;

  guideCategories?: IGuideCategory[];
  listings?: IListing[];
  bookings?: IBooking[];
  reviews?: IReview[];
}
