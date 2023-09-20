"use client";
import React, { useEffect, useState } from "react";
import SignupInputs from "../components/authInputs/SignupInputs";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../utitls/firebase/clientApp";
import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

type signupProps = {};

const Signup: React.FC<signupProps> = () => {
  const router = useRouter();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const { toast } = useToast();

  const [createUserWithEmailAndPassword, userCred, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formError) setFormError("");
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
    try {
      createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
      toast({
        title: "Accout Created Successfully",
      });
      router.push("/");
    } catch (error) {
      if (error) {
        toast({ title: "Something went wrong" });
      }
    }
  };

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <>
      <div className="max-w-[476px] flex flex-col translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] fixed">
        <Link
          href={""}
          className="flex gap-2 align-middle mb-12 justify-center"
        >
          <Image src="./solar_link-circle-bold.svg" alt="logo" />
          <Image src="./devlinks.svg" alt="logo text" />
        </Link>
        <div className="md:bg-White rounded-lg p-10">
          <div className="flex flex-col gap-2 mb-10">
            <h1 className="text-Dark-Grey text-2xl md:text-[2rem] font-bold">
              Create account
            </h1>
            <span className="text-Grey text-base font-normal">
              Let’s get you started sharing your links!
            </span>
          </div>
          <SignupInputs
            confirmPassword={signUpForm.confirmPassword}
            email={signUpForm.email}
            password={signUpForm.password}
            onChange={onChange}
            onSubmit={onSubmit}
            formError={formError}
            isLoading={loading}
          />

          <Link
            className="mt-6 text-Grey text-base font-normal"
            href={"/login"}
          >
            Already have an account? <span className="text-Purple">Login</span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Signup;
