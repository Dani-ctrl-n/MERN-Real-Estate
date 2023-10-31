import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: "",
    discountPrice: "",
    bedrooms: "",
    bathrooms: "",
    furnished: false,
    parking: false,
    type: "",
    offer: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [listingError, setListingError] = useState(false);
  const [listingLoading, setListingLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);

      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setListingError("You must upload at least one image");

      if (+formData.regularPrice < +formData.discountPrice)
        return setListingError(
          "Discount price must be lower than regular price"
        );
      setListingLoading(true);
      setListingError(false);

      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setListingLoading(false);
      setListingError(false);

      if (data.success === false) {
        setListingLoading(false);
        setListingError(data.message);
      }

      navigate(`/listing/${data._id}`);
    } catch (error) {
      setListingError(error.message);
      setListingLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Update a listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col flex-1 gap-4">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength="64"
            minLength="5"
            required
            className="border p-2 rounded-xl"
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="textarea"
            id="description"
            placeholder="Description"
            minLength="10"
            required
            className="border p-2 rounded-xl"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            className="border p-2 rounded-xl"
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-4 flex-wrap items-center">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sell"
                className="hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="hover:cursor-pointer"
                onChange={handleChange}
                checked={formData.offer}
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                required
                className="border p-2 rounded-xl"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="1"
                  required
                  className="border p-2 rounded-xl"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  <span className="text-xs">($/month)</span>
                </div>
              </div>
            )}
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
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-2 border rounded-xl w-full"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className="p-2 text-green-700 border rounded-xl hover:shadow-lg disabled:bg-gray-400 disabled:text-white"
            >
              {uploading ? "Uploading... " : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-1 border rounded-xl items-center"
              >
                <img
                  src={url}
                  alt="Listing Image"
                  className="w-20 h-20 object-contain rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="text-red-700 border rounded-xl p-2 hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={listingLoading || uploading}
            className="bg-green-700 text-white p-2 rounded-xl hover:opacity-95 text-center disabled:bg-gray-400 mt-5"
          >
            {listingLoading ? "Updating..." : "Update Listing"}
          </button>
          {listingError && (
            <p className="text-red-700 text-sm">{listingError}</p>
          )}
        </div>
      </form>
    </main>
  );
}
