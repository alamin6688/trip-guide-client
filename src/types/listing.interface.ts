import { IBooking } from "./booking.interface";
import { ICategory } from "./category.interface";
import { IGuide } from "./guide.interface";

export interface IListing {
  id: string;

  guideId: string;
  categoryId: string;

  title: string;
  description: string;
  itinerary: string;

  price: number;
  durationHours: number;
  meetingPoint: string;
  maxGroupSize: number;

  city: string;
  languages: string[];
  images: string[];

  isActive: boolean;
  isDeleted: boolean;

  guide?: IGuide;
  categories?: ICategory;
  bookings?: IBooking[];

  createdAt: string;
  updatedAt: string;
}
