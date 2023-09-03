"use client";

import React, { useEffect, useState } from "react";
import LoginInputs from "../components/authInputs/LoginInputs";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../utitls/firebase/clientApp";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

type loginProps = {};

const login: React.FC<loginProps> = () => {
  const router = useRouter();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const [signInWithEmailAndPassword, userCred, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (formError) setFormError("");
    e.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  useEffect(() => {
    if (error) {
      setFormError(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (userCred) {
      toast({
        title: "SignIn Succesful",
      });
      router.push("/");
    }
  }, [userCred]);

  return (
    <>
      <div className="w-[476px] flex flex-col translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] fixed">
        <Link
          href={""}
          className="flex gap-2 align-middle mb-12 justify-center"
        >
          <img src="./solar_link-circle-bold.svg" alt="logo" />
          <img src="./devlinks.svg" alt="logo text" />
        </Link>
        <div className="bg-White rounded-lg p-10">
          <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-Dark-Grey text-[2rem] font-bold">Login</h1>
            <span className="text-Grey text-base font-normal">
              Add your details below to get back into the app
            </span>
          </div>
          <LoginInputs
            onChange={onChange}
            email={loginForm.email}
            password={loginForm.password}
            onSubmit={onSubmit}
            isLoading={loading}
            formError={formError}
          />
          <Link
            className="mt-6 text-Grey text-base font-normal "
            href={"/signup"}
          >
            Don&#39;t have an account?{" "}
            <span className="text-Purple">Create account</span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default login;
