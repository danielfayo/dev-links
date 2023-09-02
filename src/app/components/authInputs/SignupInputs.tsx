import React from "react";
import { Lock, Mail } from "lucide-react";

type SignupInputsProps = {};

const SignupInputs: React.FC<SignupInputsProps> = () => {
  return (
    <>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col relative">
            <label
              htmlFor="email"
              className="text-xs font-normal text-Dark-Grey leading-5 mb-1"
            >
              Email address
            </label>
            <input
              type="text"
              required
              name="email"
              placeholder="e.g. alex@email.com"
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-Light-Grey pl-[2.75rem] pr-4 text-opacity-50"
            />
            <Mail size={16} className="text-Grey ml-4 mr-3 absolute bottom-4" />
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="text-xs font-normal text-Dark-Grey leading-5 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              placeholder="At least 8 characters"
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-Light-Grey pl-[2.75rem] pr-4 text-opacity-50"
            />
            <Lock size={16} className="text-Grey ml-4 mr-3 absolute bottom-4" />
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor="confirm password"
              className="text-xs font-normal text-Dark-Grey leading-5 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              required
              name="confirm password"
              placeholder="At least 8 characters"
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-Light-Grey pl-[2.75rem] pr-4 text-opacity-50"
            />
            <Lock size={16} className="text-Grey ml-4 mr-3 absolute bottom-4" />
          </div>
          <span className="text-xs text-Grey font-normal">Password must contain at least 8 characters</span>
        </div>

        <button className="py-[0.69rem] px-[1.69reme] bg-Purple text-White justify-center text-base font-semibold rounded-lg w-full my-6">
          Login
        </button>
      </form>
    </>
  );
};
export default SignupInputs;
