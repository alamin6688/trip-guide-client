/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function getMyBookings() {
  try {
    const response = await serverFetch.get(`/booking/my`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // bookings should always be fresh
      credentials: "include",
      next: { tags: ["booking-list"] },
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to fetch my bookings");
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function postBooking(payload: any) {
  try {
    const response = await serverFetch.post(`/booking`, {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      credentials: "include",
      next: { tags: ["booking-list"] },
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Booking request failed");
    }

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function initiatePayment(bookingId: string) {
  const response = await serverFetch.post(
    `/booking/${bookingId}/initiate-payment`,
    {
      credentials: "include",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Payment initiation failed");
  }

  return response.json();
}
