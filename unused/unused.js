// /*
// https://cloud.appwrite.io/console/project-664857ee0034fd714bc5/auth
//  https://dashboard.plaid.com/developers/keys
//  https://dashboard.plaid.com/overview
//  https://plaid.com/docs/link/web/
//  https://cloud.appwrite.io/console/project-665850d3001517ade180/overview/platforms
//  https://appwrite.io/docs/tutorials/nextjs-ssr-auth/step-1
//  https://1am-programmer.sentry.io/issues/
//  https://dashboard-sandbox.dwolla.com/customers
//  https://www.youtube.com/watch?v=PuOVqP_cjkE&t=19090s

// */

// //  Tools
// //  Appwrite
// //  dwolla
// //  Shadcn
// //  nextjs
// //  Tailwind
// //  plaid
// //  Sentry
// //  zod

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import CustomInput from "./CustomInput";
// import { authFormSchema } from "@/lib/utils";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";

// import PlaidLink from "./PlaidLink";
// import { signIn, signUp } from "@/lib/actions/user.actions";

// const AuthForm = ({ type }: { type: string }) => {
//   const router = useRouter();

//   const [user, setUser] = useState(null);
//   const [isLoading, setisLoading] = useState(false);
//   // const loggedIn = await getLoggedInUser();

//   const formSchema = authFormSchema(type);
//   // 1. Define your form.

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // 2. Define a submit handler.
//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     setisLoading(true);
//     try {
//       //Sign up with appwrite

//       const userData = {
//         firstName: data.firstName!,
//         lastName: data.lastName!,
//         address1: data.address1!,
//         city: data.city!,
//         state: data.state!,
//         postalCode: data.postalCode!,
//         dateOfBirth: data.dateOfBirth!,
//         ssn: data.ssn!,
//         email: data.email,
//         password: data.password,
//       };

//       if (type === "sign-up") {
//         const newUser = await signUp(userData);
//         setUser(newUser);
//       }
//       if (type === "sign-in") {
//         const response = await signIn({
//           email: data.email,
//           password: data.password,
//         });

//         if (response) router.push("/");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setisLoading(false);
//     }
//   };

//   return (
//     <section className="auth-form">
//       <header className="flex flex-col gap-5 md:gap-8">
//         <Link href="/" className="cursor-pointer flex items-center gap-1  ">
//           <Image src="icons/logo.svg" width={34} height={34} alt="image" />
//           <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
//             Horizon
//           </h1>
//         </Link>
//         <div className="flex flex-col gap-1 md:gap-3">
//           <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
//             {/* IF user is true, link account, else it should check the type the one in props}
//             if the type === Sign in, display sign page, else display login page */}
//             {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
//             <p className="text-16 font-normal text-gray-600">
//               {user ? "Link your account" : "Please enter your details"}
//             </p>
//           </h1>
//         </div>
//       </header>
//       {user ? (
//         <div className="flex flex-col gap-4">
//           <PlaidLink user={user} variant="primary" />
//         </div>
//       ) : (
//         <>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               {type === "sign-up" && (
//                 <>
//                   <div className="flex gap-4">
//                     <CustomInput
//                       control={form.control}
//                       name="firstName"
//                       label="First Name"
//                       placeholder="Example: Dan"
//                       type={"text"}
//                     />
//                     <CustomInput
//                       control={form.control}
//                       name="lastName"
//                       label="Last Name"
//                       placeholder="Example: Danny"
//                       type={"text"}
//                     />
//                   </div>
//                   <CustomInput
//                     control={form.control}
//                     name="address1"
//                     label="Address"
//                     placeholder="Enter your address1"
//                     type={"text"}
//                   />
//                   <CustomInput
//                     control={form.control}
//                     name="city"
//                     label="City"
//                     placeholder="Enter your City"
//                     type={"text"}
//                   />
//                   <div className="flex gap-4">
//                     <CustomInput
//                       control={form.control}
//                       name="state"
//                       label="State"
//                       placeholder="NY"
//                       type={"text"}
//                     />
//                     <CustomInput
//                       control={form.control}
//                       name="postalCode"
//                       label="Postal Code"
//                       placeholder=" 0000"
//                       type={"text"}
//                     />
//                   </div>

//                   <div className="flex gap-4">
//                     <CustomInput
//                       control={form.control}
//                       name="dateOfBirth"
//                       label="Date of Birth"
//                       placeholder="YYYY-MM-DD"
//                       type={"text"}
//                     />

//                     <CustomInput
//                       control={form.control}
//                       name="ssn"
//                       label="Ssn"
//                       placeholder="1234 ***"
//                       type={"text"}
//                       key={1}
//                     />
//                   </div>
//                 </>
//               )}

//               <CustomInput
//                 control={form.control}
//                 name="email"
//                 label="Email"
//                 placeholder="Input your Email"
//                 type={"email"}
//               />
//               <CustomInput
//                 control={form.control}
//                 name="password"
//                 label="Password"
//                 placeholder="Input your password"
//                 type={"password"}
//               />
//               <div className="flex flex-col gap-4">
//                 <Button type="submit" disabled={isLoading} className="form-btn">
//                   {isLoading ? (
//                     <>
//                       <Loader2 size={20} className="animate-spin" /> &nbsp;
//                       Loading...
//                     </>
//                   ) : type === "sign-in" ? (
//                     "Sign In"
//                   ) : (
//                     "Sign Up"
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>

//           <footer className="flex justify-center gap-1">
//             <p className="text-14 font-normal text-gray-600">
//               {type === "sign-in"
//                 ? "Don't have an account?"
//                 : "Already have an account?"}
//             </p>
//             <Link
//               href={type === "sign-in" ? "/sign-up" : "/sign-in"}
//               className="form-link"
//             >
//               {type === "sign-in" ? "Sign up" : "Sign in"}
//             </Link>
//           </footer>
//         </>
//       )}
//     </section>
//   );
// };

// export default AuthForm;

// //CUSTOM  INPUT

// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, Control, FieldPath } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { authFormSchema } from "@/lib/utils";

// const formSchema = authFormSchema("sign-up");
// interface CustomInput {
//   //   form: typeof Form;
//   control: Control<z.infer<typeof formSchema>>;
//   name: FieldPath<z.infer<typeof formSchema>>;
//   label: string;
//   type: string;
//   placeholder: string;
// }

// const CustomInput = ({
//   control,
//   name,
//   label,
//   placeholder,
//   type,
// }: CustomInput) => {
//   return (
//     <div>
//       <FormField
//         control={control}
//         name={name}
//         render={({ field }) => (
//           <div className="form-item">
//             <FormLabel className="form-label">{label}</FormLabel>
//             <div className="flex w-full flex-col">
//               <FormControl>
//                 <Input
//                   placeholder={placeholder}
//                   className="input-class"
//                   type={type}
//                   {...field}
//                   // You have the spread the fields, that is how the react form works
//                 />
//               </FormControl>
//               <FormMessage className="form-message mt-2" />
//             </div>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default CustomInput;
