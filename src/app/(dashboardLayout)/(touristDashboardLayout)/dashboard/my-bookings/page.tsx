/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { initiatePayment } from "@/services/tourist/touristsManagement";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
  paymentStatus: "PAID" | "UNPAID";
  startDate: string;
  endDate: string | null;
  listing: {
    title: string;
    city: string;
    price: number;
  };
  guide: {
    name: string;
  };
}

const MyBookings = () => {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      try {
        // 🔐 Check logged-in tourist
        const user = await getUserInfo();

        if (!user?.touristId) {
          router.push("/login?redirect=/tourist/my-bookings");
          return;
        }

        // ✅ IMPORTANT: credentials included
        const res = await serverFetch.get("/booking/my", {
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to fetch bookings");
        }

        const result = await res.json();

        if (!result.success) {
          throw new Error(result.message || "Failed to fetch bookings");
        }

        setBookings(result.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [router]);

  if (loading) {
    return <p className="text-center py-10">Loading your bookings…</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-start justify-center">
        <div className="text-center">
          <p className="text-center py-4 text-gray-500">
            You don’t have any bookings yet.
          </p>
          <Button>
            <a href="/explore-tours">Explore Tours</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">My Bookings</h3>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="border rounded-xl p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold">
                  {booking.listing.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {booking.listing.city} • Guide: {booking.guide.name}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
          ${
            booking.status === "ACCEPTED"
              ? "bg-green-100 text-green-700"
              : booking.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : booking.status === "COMPLETED"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <strong>Dates:</strong>{" "}
                {new Date(booking.startDate).toLocaleDateString()}
                {booking.endDate &&
                  ` – ${new Date(booking.endDate).toLocaleDateString()}`}
              </p>

              <p>
                <strong>Price:</strong> ${booking.listing.price}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                <span
                  className={
                    booking.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-orange-600"
                  }
                >
                  {booking.paymentStatus}
                </span>
              </p>
            </div>

            {/* 🔥 PAYMENT & REVIEW BUTTONS */}
            <div className="mt-4 flex gap-2">
              {booking.paymentStatus === "PAID" ? (
                <>
                <div className="flex items-center justify-between w-full">

                  <button
                    disabled
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed"
                    >
                    Payment Completed
                  </button>
                  <button
                    onClick={() =>
                        router.push(
                            `/dashboard/review?bookingId=${booking.id}&guideName=${booking.guide.name}&listingTitle=${booking.listing.title}`
                        )
                    }
                    className="px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600"
                    >
                    Leave Review
                  </button>
                      </div>
                </>
              ) : booking.status === "ACCEPTED" ? (
                <button
                  onClick={async () => {
                    try {
                      const res = await initiatePayment(booking.id);
                      window.location.href = res.data.paymentUrl;
                    } catch (err: any) {
                      alert(err.message);
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Pay Now
                </button>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 rounded-lg bg-orange-100 text-gray-400 cursor-not-allowed"
                >
                  Wait For Guide Approval
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
