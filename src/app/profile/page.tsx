"use client";

import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import Nav from "../components/ui/Nav";
import { Image, LoaderIcon } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../utitls/firebase/clientApp";
import { useSignOut } from "react-firebase-hooks/auth";
import PhonePreview from "../components/ui/PhonePreview";
import { DocumentData, doc, getDoc } from "firebase/firestore";

type profileProps = {};

const profile: React.FC<profileProps> = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<DocumentData>();
  const [signOut, loading, error] = useSignOut(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });
  const [selectFile, setSelectFile] = useState<string>();
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setFullName((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, email: e.target.value }));
  };

  useEffect(() => {
    const getUserLinks = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(firestore, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data()?.userLinks.length > 0) {
          setUserInfo(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserLinks();
  }, [user]);

  const onSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectFile(readerEvent.target.result as string);
      }
    };
  };

  const handlePost = async () => {};

  return (
    <>
      {isLoading && (
        <div className="p-4 bg-Dark-Grey fixed z-10 top-20 translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-lg">
          <LoaderIcon className="animate-spin text-White w-6 h-6 " />
        </div>
      )}
      <Nav />
      <div className="lg:flex">
        <PhonePreview />
        <div className="bg-White rounded-lg mx-4 md:mx-6 p-6 md:p-10 w-full">
          <div className="mb-10">
            <h1 className="text-Dark-Grey text-2xl font-bold md:text-[2rem]">
              Profile Details
            </h1>
            <span className="text-base font-normal text-Grey">
              Add your details to create a personal touch to your profile.
            </span>
          </div>
          <div className="flex p-5 flex-col md:items-center bg-Light-Grey gap-4 md:flex-row md:justify-between">
            <span className="text-base font-normal text-Grey">
              Profile picture
            </span>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div
                onClick={() => selectedFileRef.current?.click()}
                className={`flex flex-col gap-2 justify-center text-center w-[193px] h-[193px] rounded-lg text-Purple cursor-pointer ${!selectFile && `bg-Light-Purple`} relative`}
              >
                <Image size={40} className="mx-auto z-10" />
                <span className="text-base font-semibold z-10">+ Upload Image</span>
                {selectFile && <img src={selectFile} className="absolute  w-[193px] h-[193px] rounded-lg object-cover opacity-60" />}
                <input
                  ref={selectedFileRef}
                  type="file"
                  hidden
                  onChange={onSelectImage}
                />
              </div>
              <span className="text-xs font-normal text-Grey md:max-w-[127px]  min-[1240px]-w-:[180px]">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </span>
            </div>
          </div>
          <div className="p-5 rounded-lg bg-Light-Grey mt-6 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-Dark-Grey text-xs font-normal mb-1">
                First name*
              </span>
              <input
                name="firstName"
                value={fullName.firstName}
                onChange={onTextChange}
                type="text"
                placeholder="e.g. John"
                className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[400px] focus:border-Purple focus:drop-shadow-xl"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-Dark-Grey text-xs font-normal mb-1">
                Last name*
              </span>
              <input
                name="lastName"
                value={fullName.lastName}
                onChange={onTextChange}
                type="text"
                placeholder="e.g. Appleseed"
                className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[400px] focus:border-Purple focus:drop-shadow-xl"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-Dark-Grey text-xs font-normal mb-1">
                Email*
              </span>
              <input
                type="email"
                placeholder="e.g. email@example.com"
                value={user && userInfo?.email}
                onChange={handleChangeEmail}
                className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[400px] focus:border-Purple focus:drop-shadow-xl"
              />
            </div>
            <div>
              {user && <span>{user?.uid}</span>}
              <button
                onClick={async () => {
                  const success = await signOut();
                  if (success) {
                    alert("You are sign out");
                  }
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
          <div className="px-4">
            <button className="py-[0.69rem] px-[1.69rem] bg-Purple text-White justify-center text-base font-semibold rounded-lg w-full mt-6 flex lg:w-[96px] lg:ml-auto">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default profile;
