'use client'
import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductPage({ params }) {
  const [productDetails, setProductDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ description: '', rating: 0 });

  // Fetch product details and reviews
  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await fetch(`/api/products/overview/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data);
        } else {
          console.error('Failed to fetch product details.');
        }
      } catch (error) {
        console.error('An error occurred while fetching product details:', error);
      }
    }

    async function fetchProductReviews() {
      try {
        const response = await fetch(`/api/review/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews.');
        }
      } catch (error) {
        console.error('An error occurred while fetching reviews:', error);
      }
    }

    fetchProductDetails();
    fetchProductReviews();
  }, [params.slug]);

  // Handle form submission for adding a new review

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/review/${params.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: newReview.description,
          rating: newReview.rating,
          productId: params.slug,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // After successfully adding the review, fetch the updated reviews
        fetchProductReviews();
        setNewReview({ description: '', rating: 0 });
      } else {
        console.error('Failed to add a review.');
      }
    } catch (error) {
      console.error('An error occurred while adding a review:', error);
    }
  };

  // Handle adding the product to the cart
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id: params.slug }),
      });
  
      if (response.ok) {
        // Successful 
        alert('Added to cart successful');
      } else {
        // Failed 
        alert('Add to cart failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding to cart.');
    }
  };
  

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          </ol>
        </nav>
  
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img src={productDetails?.image1} alt={productDetails?.p_name} className="h-full w-full object-cover object-center" />
          </div>
        </div>
  
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{productDetails?.p_name}</h1>
  
            <h3 className="sr-only">Product information</h3>
            <p className="text-3xl tracking-tight text-gray-900">Price: Rs. {productDetails?.price}</p>
  
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <a href={productDetails?.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.length} reviews
              </a>
            </div>
          </div>
  
          <div className="lg:col-span-1">
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Add a Review</h3>
            </div>
  
            <form onSubmit={handleReviewSubmit}>
            <label htmlFor="rating" className="text-sm font-medium text-gray-900 block">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />

            <label htmlFor="description" className="text-sm font-medium text-gray-900 block mt-4">
              Review
            </label>
            <textarea
              id="description"
              name="description"
              value={newReview.description}
              onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />

            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Review
            </button>
          </form>
      <button
        onClick={handleSubmit}
        className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to Cart
      </button>
          </div>
  
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.review_id}>
                    <p className="text-base text-gray-900">{review.description}</p>
                    <p className="text-base text-gray-900">{`Rating: ${review.rating}/5`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 