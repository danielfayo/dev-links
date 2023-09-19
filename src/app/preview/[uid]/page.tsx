"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import platforms from "../../../../platforms";
import { platform, userLink } from "../../../../lib/types";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { ArrowRight } from "lucide-react";
import { auth, firestore } from "../../../../utitls/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { usePathname } from "next/navigation";

const preview = ({ params }: { params: { uid: string } }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<DocumentData>();
  useEffect(() => {
    const getUserLinks = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(firestore, "users", `${params.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data()?.userLinks.length > 0) {
          setData(docSnap.data());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserLinks();
  }, []);

  let filteredArr: platform[] = [];
  data?.userLinks.map((link: userLink) => {
    filteredArr = filteredArr.concat(
      platforms.filter(
        (each) => each.platform.toLocaleLowerCase() === link.plat
      )
    );
  });
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${origin}${usePathname()}`;
  // console.log(URL);

  return (
    <>
      {user?.uid === params.uid && (
        <nav className="flex items-center justify-between p-4 m-4 bg-White rounded-lg">
          <Link
            href={"/"}
            className="px-[1.69rem] py-[0.69rem]  rounded-lg text-Purple hover:bg-Light-Purple border border-Purple text-base font-semibold "
          >
            Back to Editor
          </Link>
          <button className="px-[1.69rem] py-[0.69rem]  rounded-lg bg-Purple text-White text-base font-semibold">
            Share Link
          </button>
        </nav>
      )}
      <div className="hidden md:block w-full h-[45rem] absolute -top-[50%] bg-Purple rounded-3xl -z-10" />
      <div className="flex flex-col gap-14 mt-16 p-12 md:bg-White rounded-3xl mx-auto max-w-sm md:shadow-lg">
        <div className="flex flex-col gap-6 text-center">
          <img
            src={data?.photoURL}
            alt=""
            className="h-24 w-24 rounded-full object-cover mx-auto"
          />
          <div className="flex flex-col gap-2 justify-center">
            <span className="text-Dark-Grey text-[2rem] font-bold capitalize">
              {data?.email.split("@")[0]}
            </span>
            <span className="text-Grey text-base font-normal">
              {data?.email}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full justify-center items-center">
          {filteredArr.map((each, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg w-[237px] ${
                each.platform === "Frontend Mentor" && "border border-Borders"
              }`}
              style={{ backgroundColor: each.color }}
            >
              <div className="flex gap-2 items-center">
                <img src={each.solid} alt="" className="w-5 h-5" />
                <span
                  className={`text-base font-normal ${
                    each.platform === "Frontend Mentor"
                      ? "text-Dark-Grey"
                      : "text-White"
                  }`}
                >
                  {each.platform}
                </span>
              </div>
              <ArrowRight
                size={16}
                className={`${
                  each.platform === "Frontend Mentor"
                    ? "text-Grey"
                    : "text-White"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default preview;
