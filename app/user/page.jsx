'use client'

import { useGetUserDataQuery, useGetUserReviewsQuery } from "@/lib/features/user/userApi"
import { withAuth } from "@/lib/hoc/withAuth"
import { Mail, Phone, MapPin, Home, Building, Building2, Flag, Globe } from "lucide-react"
import { StarIcon } from '@heroicons/react/20/solid'

const Page = () => {
  const { data:userData, isLoading:isUserDataLoading } = useGetUserDataQuery();
  const { data:userReviews, isLoading:isUserReviewsLoading } = useGetUserReviewsQuery();

  if(!isUserDataLoading) console.log("Current User in user page:", userData);
  if(!isUserReviewsLoading) console.log("User Reviews in user page:", userReviews)

  return (
    <div className="container mx-auto p-5 my-16">
      <h1 className="text-2xl font-bold mb-5">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">

        {/* User Profile div */}
        <div className="col-span-1 lg:cols-span-2 xl:col-span-1 border border-gray-400 rounded-lg p-8">
          {!isUserDataLoading ? (
            <div className="grid gap-4 text-gray-500 font-medium">
              <p className="text-xl font-semibold text-gray-600">{userData.firstname} {userData.lastname}</p>
              <div className="flex items-center gap-4">
                <Mail/>
                <span>{userData.emailid}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone/>
                <span>{userData.phoneno}</span>
              </div>
            </div>
          ):(
            <div className="text-center">Loading...</div>
          )}
        </div>

        {/* Address div */}
        <div className="col-span-1 lg:col-span-2 xl:col-span-2 border border-gray-400 rounded-lg p-8">
          <p className="text-xl font-semibold text-gray-600 mb-5">Address</p>
          {!isUserDataLoading ? (
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                  <Home className="text-gray-500" />
                  <span>{userData.unit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="text-gray-500" />
                  <span>{userData.street}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="text-gray-500" />
                  <span>{userData.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-gray-500" />
                  <span>{userData.statename}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="text-gray-500" />
                  <span>{userData.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="text-gray-500" />
                  <span>{userData.pincode}</span>
                </div>
              </div>
            </div>
          ):(
            <div className="text-center">Loading...</div>
          )}
        </div>
      </div>

      {/* user reviews */}
      <div className="border border-gray-400 rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-5 text-gray-600">My Reviews</h2>
        <div className="text-md grid grid-cols-1 lg:grid-cols-2 gap-5 text-gray-600">
          {!isUserReviewsLoading ? userReviews.length > 0 ? (
            userReviews.map((review) => (
              <a key={review.reviewid} href={`/category/${review.catid}/products/${review.pid}/productitem/${review.ptid}`} className="border rounded-lg px-3 py-5 hover:border-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                  <div className="w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75">
                    <img
                      src={review.imageurl}
                      alt={review.productitemtitle}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <p className="font-semibold">{review.productitemtitle}</p>
                      <div className="flex items-center justify-end mr-5">
                          <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((star) => (
                                <StarIcon
                                key={star}
                                aria-hidden="true"
                                className={review.rating > star ? 'text-gray-900 h-5 w-5 flex-shrink-0' : 'text-gray-200 h-5 w-5 flex-shrink-0'}
                                />
                            ))}
                          </div>
                          <p className="sr-only">{review.rating} out of 5 stars</p>
                      </div>
                    </div>
                    <p className='text-sm mt-2 text-gray-600'>"{review.description}"</p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center p-10">You haven't posted any reviews yet</div>
          ) : (
            <div className="text-center p-10">Loading...</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default withAuth(Page);