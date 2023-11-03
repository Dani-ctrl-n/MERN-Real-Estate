import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className=" shadow-lg hover:shadow-xl overflow-hidden rounded-xl w-full sm:w-[270px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://img.freepik.com/free-vector/logo-real-estate-home-solutions-that-is-home-solution_527952-33.jpg?w=2000"
          }
          alt="Listing cover photo"
          className="h-[320px] sm:h-[220px] w-full object-cover rounded-xl hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="text-green-700" />
            <p className="text-sm text-gray-500 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 font-semibold mt-3">
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}{" "}
            <span className="text-sm">
              {listing.type === "rent" && "/ month"}
            </span>
          </p>
          <div className="text-slate-700 flex gap-3">
            <div className="text-sm">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `1 bed`}
            </div>
            <div className="text-sm">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `1 bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
