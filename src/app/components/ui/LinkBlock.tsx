import { GripHorizontal, Link as LinkJoin } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import platforms from "../../../../platforms";

type LinkBlockProps = {
  plat: string;
  link: string
};

const LinkBlock: React.FC<LinkBlockProps> = ({ plat, link }) => {
  const platIndex = platforms.findIndex(item => item.platform.toLowerCase() === plat)
  return (
    <div className="bg-Light-Grey flex flex-col gap-3 p-5 rounded-lg mt-6">
      <div className="flex gap-2 align-middle">
        <GripHorizontal width={12} className="text-Grey" />
        <span className="text-base font-bold text-Grey">Link</span>
      </div>
      <div>
        <div>
          <span className="text-xs text-Dark-Grey font-normal">Platform</span>
          <Select>
            <SelectTrigger className="w-full border-Borders h-12 bg-White">
              <SelectValue
                placeholder={<div className="flex gap-3 text-base text-Dark-Grey font-normal">
                <img
                  src={platforms[platIndex].image}
                  alt={platforms[platIndex].platform}
                />
                {platforms[platIndex].platform}
              </div>
                }
              />
            </SelectTrigger>
            <SelectContent className="border-Borders drop-shadow-xl bg-White cursor-pointer h-80">
              {platforms.map((platform) => (
                <SelectItem value={platform.platform}>
                  <div className="flex gap-3 text-base text-Dark-Grey font-normal cursor-pointer">
                    <img src={platform.image} alt={platform.platform} />
                    {platform.platform}
                  </div>{" "}
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
            value={link}
            placeholder="e.g. https://www.github.com/johnappleseed"
            className="outline-none border border-Borders py-3 pl-[44px] rounded-lg w-full"
          />
          <LinkJoin width={16} className="text-Grey absolute bottom-3 ml-4" />
        </div>
      </div>
    </div>
  );
};
export default LinkBlock;
