import { GripHorizontal, Link as LinkJoin } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import platforms from "../../../../platforms";
import { useDispatch } from "react-redux";
import { AppDispatc, useAppSelector } from "@/redux/store";
import { updateLink } from "@/redux/features/linksSlice";
import { Modal } from "./Modal";

type LinkBlockProps = {
  plat: string;
  link: string;
  id: string;
  index: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteLink: (id: string) => void
  inputEmpty: boolean
  setInputEmpty: Dispatch<SetStateAction<boolean>>
};

const LinkBlock: React.FC<LinkBlockProps> = ({
  plat,
  link,
  id,
  index,
  onChange,
  deleteLink,
  inputEmpty,
  setInputEmpty
}) => {
  const platIndex = platforms.findIndex(
    (item) => item.platform.toLowerCase() === plat
  );

  const links = useAppSelector((state) => state.links.links);
  const dispatch = useDispatch<AppDispatc>();

  const changePlat = (value: string) => {
    const updatedUserLinks = links.map((userLink) => {
      if (userLink.id === id) {
        return {
          ...userLink,
          plat: value.toLocaleLowerCase(),
        };
      }
      return userLink;
    });
    dispatch(updateLink(updatedUserLinks))
  }

  if (link === undefined || plat === undefined){
    setInputEmpty(true)
  }

  return (
    <div className="bg-Light-Grey flex flex-col gap-3 p-5 rounded-lg mt-6">
      <div className="flex justify-between">
        <div className="flex gap-2 align-middle">
          <GripHorizontal width={12} className="text-Grey cursor-grab" />
          <span className="text-base font-bold text-Grey">
            Link {index + 1}
          </span>
        </div>
        <Modal onClick={() => deleteLink(id)}/>
      </div>
      <div>
        <div>
          <span className="text-xs text-Dark-Grey font-normal">Platform</span>
          <Select onValueChange={changePlat}>
            <SelectTrigger className="w-full border-Borders h-12 bg-White">
              <SelectValue
                placeholder={
                  plat ? (
                    <div className="flex gap-3 text-base text-Dark-Grey font-normal">
                      <img
                        src={platforms[platIndex].image}
                        alt={platforms[platIndex].platform}
                      />
                      {platforms[platIndex].platform}
                    </div>
                  ) : (
                    <span className="text-Dark-Grey">Select a Platform</span>
                  )
                }
              />
            </SelectTrigger>
            <SelectContent className="border-Borders drop-shadow-xl bg-White cursor-pointer h-80">
              {platforms.map((platform, index) => (
                <SelectItem
                  value={platform.platform}
                  key={index}
                >
                  <div
                    className={`flex gap-3 text-base  font-normal cursor-pointer ${
                      platform.platform === plat
                        ? "text-Purple"
                        : "text-Dark-Grey"
                    }`}
                  >
                    <img src={platform.image} alt={platform.platform} />
                    {platform.platform}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <span className="text-xs text-Dark-Grey font-normal">Link</span>
        <div className="relative">
          <input
            type="text"
            id={id}
            value={link}
            onChange={onChange}
            placeholder="e.g. https://www.github.com/johnappleseed"
            className="outline-none border border-Borders py-3 pl-[44px] rounded-lg w-full"
          />
          <LinkJoin width={16} className="text-Drey-Grey absolute bottom-3 ml-4" />
        </div>
      </div>
      {/* {inputEmpty && <><span className="text-xs text-Red font-normal">One of the Inputs is Empty</span></>} */}
    </div>
  );
};
export default LinkBlock;
