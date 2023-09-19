"use client";

import { AppDispatc, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import platforms from "../../../../platforms";
import { platform } from "../../../../lib/types";
import { ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateLink } from "@/redux/features/linksSlice";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../../../utitls/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

type PhonePreviewProps = {};

const PhonePreview: React.FC<PhonePreviewProps> = () => {
  const links = useAppSelector((state) => state.links.links);
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatc>();

  let filteredArr: platform[] = [];
  links.map((link) => {
    filteredArr = filteredArr.concat(
      platforms.filter(
        (each) => each.platform.toLocaleLowerCase() === link.plat
      )
    );
  });
  // console.log(filteredArr);

  useEffect(() => {
    const getUserLinks = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(firestore, "users", `${user?.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data()?.userLinks.length > 0) {
          return dispatch(updateLink(docSnap.data()?.userLinks));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserLinks();
  }, [user]);

  

  return (
    <div className="hidden min-[1240px]:flex w-[100%] max-w-[45rem] h-screen justify-center items-center bg-White mb-6 ml-8 rounded-lg sticky top-6 overflow-y-auto">
      <div className="relative flex justify-center">
        <img src="./phone.svg" alt="icon" />
        {user && (
          <div className="flex flex-col text-center gap-6 absolute top-16">
            {user?.photoURL && (
                <img src={user?.photoURL as string}  className="h-24 w-24 rounded-full mx-auto object-cover" alt="User Image" />
            )}
            <div className="flex flex-col gap-2">
              <span className="text-Dark-Grey text-lg font-semibold capitalize">
                {user?.email?.split("@")[0]}
              </span>
              <span className="text-Grey text-sm font-normal">
                {user?.email}
              </span>
            </div>
          </div>
        )}
        {user && (
          <div className="flex flex-col gap-5 mx-[2.2rem] w-[237px] h-[320px] overflow-y-auto absolute bottom-0">
            {filteredArr.map((each, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-[0.69rem] h-11 rounded-lg max-w-[237px] ${
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
        )}
      </div>
    </div>
  );
};
export default PhonePreview;
