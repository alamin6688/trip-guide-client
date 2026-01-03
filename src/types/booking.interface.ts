import { IGuide } from "./guide.interface";
import { IListing } from "./listing.interface";
import { IPayment } from "./payment.interface";
import { IReview } from "./review.interface";
import { ITourist } from "./tourist.interface";


export enum BookingStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "   REJECTED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  UNPAID = "UNPAID",
  REFUNDED = "REFUNDED",
}

export interface IBooking {
  id?: string;

  listingId: string;
  listing?: IListing;

  touristId: string;
  tourist?: ITourist;

  guideId: string;
  guide?: IGuide;

  status: BookingStatus;
  paymentStatus: PaymentStatus;

  startDate: string; // ISO string
  endDate?: string | null;

  createdAt: string;
  updatedAt: string;

  payment?: IPayment;
  review?: IReview;
}



