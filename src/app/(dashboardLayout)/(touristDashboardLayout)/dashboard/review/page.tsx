import ReviewClient from "@/components/modules/SuspenseContents/ReviewClient";
import { Suspense } from "react";

export default function ReviewPage() {
  return (
    <Suspense fallback={<ReviewSkeleton />}>
      <ReviewClient />
    </Suspense>
  );
}

function ReviewSkeleton() {
  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
      <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" />
      <div className="h-4 w-3/4 bg-gray-200 rounded mb-6" />
      <div className="h-24 bg-gray-200 rounded mb-4" />
      <div className="h-10 bg-gray-300 rounded" />
    </div>
  );
}
