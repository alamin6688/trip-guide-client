/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { postReview } from "@/services/tourist/touristsManagement";

const Review = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("bookingId");
  const guideName = searchParams.get("guideName") || "";
  const listingTitle = searchParams.get("listingTitle") || "";

  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    if (!bookingId) {
      setError("Invalid booking.");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Comment is required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await postReview({ bookingId, rating, comment });
      setSuccess("Review submitted successfully!");
      setTimeout(() => router.push("/dashboard/my-bookings"), 2000);
    } catch (err: any) {
      setError(err.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      {guideName && listingTitle && (
        <p className="mb-4 text-gray-600">
          Reviewing <strong>{guideName}</strong> for <strong>{listingTitle}</strong>
        </p>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      {/* Rating */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Comment <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full border rounded-lg p-2"
          rows={4}
          placeholder="Write your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading || !bookingId}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
};

export default Review;
