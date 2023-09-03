import { Loader2, Lock, Mail } from "lucide-react";
import React from "react";

type LoginInputsProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  password: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean
  formError: string
};

const LoginInputs: React.FC<LoginInputsProps> = ({
  onChange,
  email,
  password,
  onSubmit, 
  isLoading,
  formError
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
              onChange={onChange}
              value={email}
              required
              name="email"
              placeholder="e.g. alex@email.com"
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-none pl-[2.75rem] pr-4 focus:border-Purple focus:drop-shadow-xl outline-none"
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
              onChange={onChange}
              value={password}
              required
              name="password"
              placeholder="Enter your password"
              className="border rounded-lg py-3 text-Dark-Grey border-Borders bg-none pl-[2.75rem] pr-4 focus:border-Purple focus:drop-shadow-xl outline-none"
            />
            <Lock size={16} className="text-Grey ml-4 mr-3 absolute bottom-4" />
          </div>
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
            </div> :  'Login'}
        </button>
      </form>
    </>
  );
};
export default LoginInputs;
