import Image from "next/image";
import Nav from "./components/ui/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="flex justify-center">
        <div className="hidden min-[1440px]:flex w-[35rem] h-full bg-White my-4 ml-6 p-6 rounded-lg">
          preview
        </div>
        <div className="bg-White rounded-lg m-4 md:m-6 p-6 md:p-10 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-Dark-Grey text-2xl font-bold leading-9 ">
              Customize your links
            </h1>
            <h2 className="text-base font-normal leading-6">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </h2>
          </div>
          <button className="py-[11px] px-[27px] mt-10 w-full text-Purple text-base font-semibold border rounded-lg border-Purple hover:bg-Light-Purple">
            + Add new link
          </button>

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
        </div>
      </div>
    </>
  );
}
