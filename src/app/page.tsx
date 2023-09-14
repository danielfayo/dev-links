"use client";

import { updateLink, updateLinks } from "@/redux/features/linksSlice";
import { AppDispatc, useAppSelector } from "@/redux/store";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { auth, firestore } from "../../utitls/firebase/clientApp";
import LinkBlock from "./components/ui/LinkBlock";
import Nav from "./components/ui/Nav";
import PhonePreview from "./components/ui/PhonePreview";
import { toast } from "@/components/ui/use-toast";
import { Loader2, LoaderIcon } from "lucide-react";
import { fetchData } from "../../utitls/firebase/fetchData";
import { userLink } from "../../lib/types";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragContent from "@/providers/DragContent";

export default function Home() {
  // const {result} = fetchData()
  const [isLoading, setIsLoading] = useState(false);
  const [postingLoad, setPostingLoad] = useState(false);
  const [inputEmpty, setInputEmpty] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const [isMountedAgain, setIsMountedAgain] = useState<boolean>(false);

  const links = useAppSelector((state) => state.links.links);
  const dispatch = useDispatch<AppDispatc>();

  const updateDet = () => {
    dispatch(updateLinks({ id: nanoid(), plat: "", link: "" }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    const updatedUserLinks = links.map((userLink) => {
      if (userLink.id === id) {
        return {
          ...userLink,
          link: value,
        };
      }
      return userLink;
    });

    dispatch(updateLink(updatedUserLinks));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsEdited(true);
  }, [links]);

  const handleCreateLink = async () => {
    // links.map((each) => {
    //   if (!!each.link || !!each.plat) {
    //     setInputEmpty(true);
    //     alert("Links cannot be empty");
    //   }
    // });
    // if (inputEmpty) return;
    setPostingLoad(true);
    try {
      const userRef = doc(firestore, "users", `${user?.uid}`);
      await setDoc(
        userRef,
        {
          userLinks: links,
        },
        { merge: true }
      );
      toast({
        title: "Link added",
      });
    } catch (error) {
      console.log(error);
    }
    setPostingLoad(false);
    // alert("done");
    setIsEdited(false);
  };

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

  const handleDelete = async (id: string) => {
    const userRef = doc(firestore, "users", `${user?.uid}`);

    const newArr = links.filter((each) => each.id !== id);
    dispatch(updateLink(newArr));

    await setDoc(
      userRef,
      {
        userLinks: newArr,
      },
      { merge: true }
    );
    toast({
      title: "Deleted",
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = [...links];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    dispatch(updateLink(newItems));
  };

  return (
    <>
      {isLoading && (
        <div className="p-4 bg-Dark-Grey fixed z-10 top-20 translate-y-[-50%] translate-x-[-50%] left-[50%] rounded-lg">
          <LoaderIcon className="animate-spin text-White w-6 h-6 " />
        </div>
      )}
      <Nav />
      <div className="flex justify-center">
        <PhonePreview />
        <div className="bg-White rounded-lg m-4 md:mx-6 md:mt-0 p-6 md:p-10 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-Dark-Grey text-2xl font-bold leading-9 ">
              Customize your links
            </h1>
            <h2 className="text-base font-normal leading-6">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </h2>
          </div>
          <button
            disabled={!user}
            className="py-[11px] px-[27px] mt-10 w-full text-Purple text-base font-semibold border rounded-lg border-Purple hover:bg-Light-Purple disabled:opacity-50"
            onClick={updateDet}
          >
            + Add new link
          </button>

          {links.length === 0 ? (
            <div className="p-[20px] flex bg-Light-Grey text-center mt-6 md:mt-10 rounded-lg justify-center">
              <div className="flex flex-col gap-6 md:gap-10">
                <img
                  src="./Group273.svg"
                  alt="Image of Hand on Phone"
                  className="w-32 md:w-64 mx-auto"
                />

                <div className="flex flex-col gap-6 ">
                  <h3 className="text-Dark-Grey text-2xl font-bold">
                    Let&#39;s get you started
                  </h3>
                  <p className="text-Grey text-base font-normal max-w-[488px]">
                    Use the “Add new link” button to get started. Once you have
                    more than one link, you can reorder and edit them. We&#39;re
                    here to help you share your profiles with everyone!
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <DragContent onDragEnd={handleDragEnd}>
              <Droppable droppableId="allUserLinks">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {isMounted &&
                      links.map((link, index) => (
                        <Draggable
                          key={link.id}
                          draggableId={link.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <LinkBlock
                                plat={link.plat}
                                link={link.link}
                                id={link.id}
                                index={index}
                                onChange={handleChange}
                                deleteLink={handleDelete}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragContent>
          )}
          <div className="mt-4">
            <div className="w-full h-[0.0625rem] bg-Borders" />
            <div className="px-4">
              {user && links.length > 0 && isEdited && (
                <button
                  onClick={handleCreateLink}
                  className="py-[0.69rem] px-[1.69rem] bg-Purple text-White justify-center text-base font-semibold rounded-lg w-full mt-6 flex lg:w-[96px] lg:ml-auto"
                >
                  {postingLoad ? (
                    <div className="mx-auto">
                      <Loader2 size={20} className="text-White animate-spin" />
                    </div>
                  ) : (
                    "Save"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
