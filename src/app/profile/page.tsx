'use client'

import React from "react";
import Nav from "../components/ui/Nav";
import { Image } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../utitls/firebase/clientApp";
import { useSignOut } from 'react-firebase-hooks/auth';

type profileProps = {};

const profile: React.FC<profileProps> = () => {
  const [user] = useAuthState(auth)
  const [signOut, loading, error] = useSignOut(auth);
  return (
    <>
      <Nav />
      <div className="bg-White rounded-lg mx-4 md:mx-6 p-6 md:p-10">
        <div className="mb-10">
          <h1 className="text-Dark-Grey text-2xl font-bold md:text-[2rem]">
            Profile Details
          </h1>
          <span className="text-base font-normal text-Grey">
            Add your details to create a personal touch to your profile.
          </span>
        </div>
          <div className="flex p-5 flex-col md:items-center bg-Light-Grey gap-4 md:flex-row md:justify-between">
            <span className="text-base font-normal text-Grey">Profile picture</span>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex flex-col gap-2 justify-center text-center w-[193px] h-[193px] bg-Light-Purple rounded-lg text-Purple cursor-pointer">
                <Image size={40} className="mx-auto" />
                <div className="text-base font-semibold">+ Upload Image</div>
              </div>
              <span className="text-xs font-normal text-Grey md:max-w-[127px] lg:max-w-[215px]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </span>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-Light-Grey mt-6 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-Dark-Grey text-xs font-normal mb-1">First name*</span>
              <input type="text" placeholder="e.g. John" className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[432px]"  />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-Dark-Grey text-xs font-normal mb-1">Last name*</span>
              <input type="text" placeholder="e.g. Appleseed" className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[432px]"  />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-Dark-Grey text-xs font-normal mb-1">First name*</span>
              <input type="email" placeholder="e.g. email@example.com" className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[432px]"  />
            </div>
            <div>
            {user && <span>{user?.uid}</span>}
            <button
            onClick={async () => {
              const success = await signOut();
              if (success) {
                alert('You are sign out');
              }
            }}
            >Sign Out</button>
            </div>
          </div>
      </div>
    </>
  );
};
export default profile;
