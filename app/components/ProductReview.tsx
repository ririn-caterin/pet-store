"use client";

import useSWR from "swr";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

type Review = {
  id: number;
  user_name: string;
  rating: number;
  review_text: string;
  created_at: string;
};

type Props = {
  productId: number;
};

const apiKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? "";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
    },
  }).then((res) => res.json());

const Star = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  filled: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <span
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`cursor-pointer text-2xl ${
      filled ? "text-yellow-500" : "text-gray-400"
    }`}
  >
    ★
  </span>
);

const RatingInput = ({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
}: {
  rating: number;
  setRating: (value: number) => void;
  hoverRating: number;
  setHoverRating: (value: number) => void;
}) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= (hoverRating || rating)}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
};

const ReviewSection = ({ productId }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [errorRating, setErrorRating] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { user } = useAuth();
  const username = user?.user.name || "Guest";

  const {
    data: reviews = [],
    isLoading,
    error,
    mutate,
  } = useSWR<Review[]>(
    `${supabaseUrl}/rest/v1/review_product?product_id=eq.${productId}&order=created_at.desc`,
    fetcher
  );

  const handleRatingClick = (star: number) => {
    setRating(star);
    if (errorRating) setErrorRating("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setErrorRating("Please select a rating before submitting.");
      return;
    }

    setErrorRating("");
    setIsSubmitting(true);
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/review_product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          product_id: productId,
          user_name: username,
          rating,
          review_text: reviewText,
        }),
      });

      if (response.ok) {
        setRating(0);
        setReviewText("");
        mutate(); // Refresh data setelah submit
        setSuccessMessage("Your review has been submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Failed to load reviews.</p>;

  return (
    <div className="flex flex-col md:flex-row md:space-x-12 mt-8">
      {/* Kolom Kiri: Daftar Review */}

      <div className="md:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Product Reviews
          </h2>
          <span className="ml-1 text-sm text-gray-600">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""}
          </span>
        </div>
        {reviews?.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-md p-4 bg-white"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-700 font-medium">
                      {review.user_name}
                    </p>
                    <p className="text-yellow-500 mt-1 text-sm">
                      {"★".repeat(review.rating)}{" "}
                      <span className="text-gray-300">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">{review.review_text}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>

      {/* Kolom Kanan: Form Review */}
      <div className="md:w-1/2">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Write a Review
        </h2>
        {!user ? (
          <div>
            <p className="text-red-500">
              Please login first to write a review.
            </p>
            <Link
              href="/api/auth/signin"
              className="block text-center w-40 bg-blue-500 text-white py-2 px-5 text-sm rounded-md hover:bg-blue-600 transition disabled:opacity-50 mt-2"
            >
              Login
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 rounded-lg p-4 bg-white space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-700 mb-1">Rating</label>
              <RatingInput
                rating={rating}
                setRating={handleRatingClick}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
              />
              {errorRating && (
                <p className="text-red-500 text-xs mt-1">{errorRating}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-100 focus:outline-none"
                placeholder="Write your review here..."
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-5 text-sm rounded-md hover:bg-blue-600 transition disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
            {successMessage && (
              <p className="text-green-500 text-sm mt-3">{successMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
