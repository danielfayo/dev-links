"use client";

import { toast } from "@/components/ui/use-toast";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { Image as ImageIcon, Loader2, LoaderIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
  useAuthState,
  useSignOut,
  useUpdateEmail,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../../utitls/firebase/clientApp";
import Nav from "../components/ui/Nav";
import PhonePreview from "../components/ui/PhonePreview";
import { User, updateEmail, updateProfile } from "firebase/auth";
import Image from "next/image";

type profileProps = {};

const Profile: React.FC<profileProps> = () => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState<DocumentData>();
  const [signOut, loading, error] = useSignOut(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  // const [updateEmail, updatingEmail, emailError] = useUpdateEmail(auth);
  // const [updateProfile, updatingProfile, profileError] = useUpdateProfile(auth);
  const [selectFile, setSelectFile] = useState<string>();
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState(false);
  

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

  const setProfilePhoto = async () => {
    setProfileLoading(true);
    const imageRef = ref(storage, `profilePhoto/${user?.uid}`);
    await uploadString(imageRef, selectFile!, "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    try {
      updateProfile(auth.currentUser as User, {
        displayName: "",
        photoURL: downloadURL,
      });
      const userRef = doc(firestore, "users", `${user?.uid}`);
      await setDoc(
        userRef,
        {
          photoURL: downloadURL,
        },
        { merge: true }
      );
      toast({ title: "Photo Updated" });
    } catch (error) {
      console.log(error);
    }
    setProfileLoading(false);
  };

  const handleUpdateEmail = async () => {
    setUpdatingEmail(true);
    try {
      await updateEmail(auth.currentUser as User, email as string);
      const userRef = doc(firestore, "users", `${user?.uid}`);
      await setDoc(
        userRef,
        {
          email: email,
        },
        { merge: true }
      );
      toast({ title: "Email Address Updated Successfully" });
    } catch (error) {
      console.log(error);
      toast({ title: "An Error Occured. Log In and try again" });
    }
    setUpdatingEmail(false);
  };

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
        <div className="px-4 md:px-6 w-full">
          <div className="bg-White rounded-lg p-6 md:p-10 w-full">
            <div className="mb-10">
              <h1 className="text-Dark-Grey text-2xl font-bold md:text-[2rem]">
                Profile Details
              </h1>
              <span className="text-base font-normal text-Grey">
                Add your details to create a personal touch to your profile.
              </span>
            </div>
            <div className="flex p-5 flex-col md:items-center bg-Light-Grey gap-4 ">
              <div className="flex flex-col gap-2 md:items-center lg:items-center justify-between md:flex-row w-full">
                <span className="text-base font-normal text-Grey">
                  Profile picture
                </span>
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div
                    onClick={() => selectedFileRef.current?.click()}
                    className={`flex flex-col gap-2 justify-center text-center w-[193px] h-[193px] rounded-lg text-Purple cursor-pointer ${
                      !selectFile || (!user?.photoURL && `bg-Light-Purple`)
                    } relative`}
                  >
                    <ImageIcon size={40} className="mx-auto z-10" />
                    <span className="text-base font-semibold z-10">
                      + Upload Image
                    </span>
                    {selectFile ? (
                      <Image
                        src={selectFile}
                        width={193}
                        height={193}
                        alt=""
                        className="absolute  w-[193px] h-[193px] rounded-lg object-cover opacity-40"
                      />
                    ) : (
                      <Image
                        src={user?.photoURL as string}
                        width={193}
                        height={193}
                        alt=""
                        className="absolute  w-[193px] h-[193px] rounded-lg object-cover opacity-40"
                      />
                    )}
                    <input
                      ref={selectedFileRef}
                      type="file"
                      hidden
                      onChange={onSelectImage}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-normal text-Grey md:max-w-[127px]  min-[1240px]-w-:[180px]">
                      Image must be below 1024x1024px. Use PNG or JPG format.
                    </span>
                  </div>
                </div>
              </div>
              <button
                disabled={!selectFile}
                onClick={setProfilePhoto}
                className={`py-[0.69rem] px-[1.69rem] hover:bg-Light-Purple text-Purple border justify-center text-base font-semibold rounded-lg w-full mt-6 flex lg:ml-auto disabled:opacity-50`}
              >
                {profileLoading ? (
                  <>
                    <Loader2 className="text-Purple h-5 w-5 animate-spin" />
                  </>
                ) : (
                  "Save Image"
                )}
              </button>
            </div>

            <div className="p-5 rounded-lg bg-Light-Grey mt-6 flex flex-col gap-3">
              {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <span className="text-Dark-Grey text-xs font-normal mb-1">
                First name*
              </span>
              <input
                name="firstName"
                value={
                  userInfo?.userDetails?.firstName !== undefined
                    ? userInfo?.userDetails?.firstName
                    : userInfo?.email.split("@")[0]
                }
                onChange={onTextChange}
                type="text"
                placeholder="e.g. John"
                className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[400px] focus:border-Purple focus:drop-shadow-xl"
              />
            </div> */}
              {/* <div className="flex flex-col md:flex-row md:justify-between md:items-center">
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
            </div> */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="text-Dark-Grey text-xs font-normal mb-1">
                  Update Email*
                </span>
                <input
                  type="email"
                  placeholder="e.g. email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 border border-Borders rounded-lg outline-none md:w-[344px] lg:w-[400px] focus:border-Purple focus:drop-shadow-xl"
                />
              </div>
              <button
                disabled={!email}
                onClick={handleUpdateEmail}
                className={`py-[0.69rem] px-[1.69rem] hover:bg-Light-Purple text-Purple border justify-center text-base font-semibold rounded-lg w-full mt-6 flex lg:ml-auto disabled:opacity-50`}
              >
                {updatingEmail ? (
                  <>
                    <Loader2 className="text-Purple h-5 w-5 animate-spin" />
                  </>
                ) : (
                  "Update Email"
                )}
              </button>
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
            <div className="px-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
