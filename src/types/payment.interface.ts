/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBooking, PaymentStatus } from "./booking.interface";

export interface IPayment {
  id: string;

  bookingId: string;
  booking?: IBooking;

  amount: number;
  currency: string;

  transactionId: string;
  status: PaymentStatus;

  paymentGatewayData?: Record<string, any> | null;
  stripeEventId?: string | null;

  createdAt: string;
  updatedAt: string;
}
