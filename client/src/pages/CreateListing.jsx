import React from "react";

export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength="64"
            minLength="5"
            required
            className="border p-2 rounded-xl"
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            minLength="10"
            required
            className="border p-2 rounded-xl"
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            className="border p-2 rounded-xl"
          />
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sell"
                className="hover:cursor-pointer"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sell"
                className="hover:cursor-pointer"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sell"
                className="hover:cursor-pointer"
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sell"
                className="hover:cursor-pointer"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sell"
                className="hover:cursor-pointer"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="99"
                required
                className="border p-2 rounded-xl"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="99"
                required
                className="border p-2 rounded-xl"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="99"
                required
                className="border p-2 rounded-xl"
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="99"
                required
                className="border p-2 rounded-xl"
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-2 border rounded-xl w-full"
            />
            <button className="p-2 text-green-700 border border-green-700 rounded-xl hover:shadow-lg disabled:bg-gray-400">
              Upload
            </button>
          </div>
          <button className="bg-green-700 text-white p-2 rounded-xl hover:opacity-95 text-center disabled:bg-gray-400 mt-5">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
