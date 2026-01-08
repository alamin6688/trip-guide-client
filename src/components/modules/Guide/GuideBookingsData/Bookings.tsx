"use client";

import { useState } from "react";
import {
  IBooking,
  BookingStatus,
  PaymentStatus,
} from "@/types/booking.interface";
import { updateBookingStatus } from "@/services/admin/guidesManagement";

interface BookingsProps {
  bookingsData: IBooking[];
}

const Bookings = ({ bookingsData }: BookingsProps) => {
  const [bookings, setBookings] = useState<IBooking[]>(bookingsData);

  const handleStatusUpdate = async (
    id: string,
    status: BookingStatus.ACCEPTED | BookingStatus.REJECTED
  ) => {
    const result = await updateBookingStatus(id, status);
    if (result.success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } else {
      alert(result.message);
    }
  };

  // Pending and Upcoming bookings
  const pending = bookings.filter((b) => b.status === BookingStatus.PENDING);
  const upcoming = bookings.filter((b) => b.status === BookingStatus.ACCEPTED);

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold">Your Bookings</h3>

      {/* Pending Requests */}
      <div>
        <h4 className="text-xl font-semibold mb-2">Pending Requests</h4>
        {pending.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          pending.map((booking) => (
            <div
              key={booking.id}
              className="border p-4 rounded-md flex justify-between items-center mb-2"
            >
              <div>
                <p>
                  <strong>{booking.tourist?.name}</strong> —{"> "}
                  {new Date(booking.startDate).toLocaleDateString()}
                  <span> {"-"} </span>
                  {new Date(
                    booking.endDate || booking.startDate
                  ).toLocaleDateString()}
                </p>
                <p>Status: {booking.status}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() =>
                    handleStatusUpdate(booking.id!, BookingStatus.ACCEPTED)
                  }
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  disabled={booking.paymentStatus === PaymentStatus.PAID}
                >
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleStatusUpdate(booking.id!, BookingStatus.REJECTED)
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upcoming Bookings */}
      <div>
        <h4 className="text-xl font-semibold mb-2">Upcoming Bookings</h4>
        {upcoming.length === 0 ? (
          <p>No upcoming bookings.</p>
        ) : (
          upcoming.map((booking) => (
            <div
              key={booking.id}
              className="border p-4 rounded-md flex justify-between items-center mb-2"
            >
              <div>
                <p>
                  <strong>{booking.tourist?.name}</strong> —{"> "}
                  {new Date(booking.startDate).toLocaleDateString()}
                  <span> {"-"} </span>
                  {new Date(
                    booking.endDate || booking.startDate
                  ).toLocaleDateString()}
                </p>
                <p>Status: {booking.status}</p>
                <p>Payment: {booking.paymentStatus}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;
