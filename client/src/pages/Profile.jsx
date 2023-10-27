import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avatar}
          alt="profile image"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          id="username"
          type="text"
          placeholder="username"
          className="border p-2 rounded-xl"
        />
        <input
          id="username"
          type="email"
          placeholder="email"
          className="border p-2 rounded-xl"
        />
        <input
          id="username"
          type="password"
          placeholder="password"
          className="border p-2 rounded-xl"
        />
        <button className="bg-slate-700 text-white p-2 rounded-xl hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">Sign out</span>
      </div>
    </div>
  );
}
