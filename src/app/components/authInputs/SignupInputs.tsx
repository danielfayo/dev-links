import React from "react";
import { Loader2, Lock, Mail } from "lucide-react";

type SignupInputsProps = {
  email: string;
  password: string;
  confirmPassword: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  formError: string,
  isLoading: boolean
};

const SignupInputs: React.FC<SignupInputsProps> = ({
  confirmPassword,
  email,
  password,
  onChange,
  onSubmit,
  formError, 
  isLoading
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
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
              value={email}
              onChange={onChange}
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-none pl-[2.75rem] pr-4  focus:border-Purple focus:drop-shadow-xl outline-none"
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
              value={password}
              onChange={onChange}
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-none pl-[2.75rem] pr-4 focus:border-Purple focus:drop-shadow-xl outline-none"
            />
            <Lock size={16} className="text-Grey ml-4 mr-3 absolute bottom-4" />
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-normal text-Dark-Grey leading-5 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              required
              name="confirmPassword"
              placeholder="At least 8 characters"
              value={confirmPassword}
              onChange={onChange}
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-none pl-[2.75rem] pr-4 focus:border-Purple focus:drop-shadow-xl outline-none"
            />
            <Lock size={16} className="text-Grey ml-4 mr-3 absolute bottom-4" />
          </div>
          <span className="text-xs text-Grey font-normal">
            Password must contain at least 8 characters
          </span>
        </div>
        {formError && (
            <>
            <span className="text-xs text-Red font-normal">{formError}</span> <br/>
            </>
          )}

        <button
          type="submit"
          className="py-[0.69rem] px-[1.69reme] bg-Purple text-White justify-center text-base font-semibold rounded-lg w-full my-6 flex"
        >
          { isLoading ? <div className="mx-auto">
            <Loader2 size={20} className="text-White animate-spin" />
            </div> :  'Create new account'}
        </button>
      </form>
    </>
  );
};
export default SignupInputs;
