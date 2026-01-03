import { IBooking } from "./booking.interface";
import { IGuide } from "./guide.interface";
import { ITourist } from "./tourist.interface";

export interface IReview {
  id: string;

  bookingId: string;
  booking?: IBooking;

  guideId: string;
  guide?: IGuide;

  touristId: string;
  tourist?: ITourist;

  rating: number;
  comment?: string;

  createdAt: string;
  updatedAt: string;
}

export interface IReviewFormData {
  bookingId: string;
  rating: number;
  comment: string;
}
