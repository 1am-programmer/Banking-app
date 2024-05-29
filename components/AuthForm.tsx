"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { signIn } from "../lib/actions/user.actions";
import { signUp, signIn, getLoggedInUser } from "../lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  // const loggedIn = await getLoggedInUser();

  const formSchema = authFormSchema(type);
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setisLoading(true);

    try {
      //Sign in with Appwrite and plaid

      if (type === "sign-up") {
        /* To Sign up, we await data from signUp function that takes in the data, and the data contains email,
         password and other data from the user in the sign up page */
        const newUser = await signUp(data);

        setUser(newUser);
      }
      if (type === "sign-in") {
        // To sign in we need the email and password
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // });
        //If the response was successful, use the router to navigate to the homepage
        // if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1  ">
          <Image src="icons/logo.svg" width={34} height={34} alt="image" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {/* IF user is true, link account, else it should check the type{the one in props}
            if the type === Sign in, display sign page, else display login page */}
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user ? "Link your account" : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid Link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="example: Dan"
                      type={"text"}
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="example: Danny"
                      type={"text"}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter your address"
                    type={"text"}
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your City"
                    type={"text"}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                      type={"text"}
                    />
                    <CustomInput
                      control={form.control}
                      name="postal"
                      label="Postal Code"
                      placeholder="Example: 810014"
                      type={"text"}
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="Dob"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                      type={"text"}
                    />

                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="1234 ***"
                      type={"text"}
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Input your Email"
                type={"email"}
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Input your password"
                type={"password"}
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading..
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
