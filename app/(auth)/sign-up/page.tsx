import React from "react";
import AuthForm from "@/components/AuthForm";

/**
 * When you create route groups, they are not added to the file based routing,
 *  they're just used to create layouts and meaningful routing
 *Only folders within them that do not have paranthesis, count as additional routes

 */

const SignUp = async () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUp;
