"use server";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    //Mutation / Database / Make fetch

    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  try {
    //Mutation / Database / Make fetch
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
    /*parseStringify is a special utility function that runs JSon. parse and stringify on the user object, 
Because in next js, you cannot parse large objects which is the neter user objects, just like tghat in through server actions
Rather we have to stringify them first
    */
  } catch (error) {
    console.error("Error", error);
  }
};

// ... your initilization functions

export async function getLoggedInUser() {
  // try {
  //   const { account } = await createSessionClient();
  //   const user = await account.get();
  //   return parseStringify(user);
  // } catch (error) {
  //   return null;
  // }

  try {
    const { account } = await createSessionClient();
    // const result = await account.get();
    const user = await account.get();

    // const user = await getUserInfo({ userId: result.$id})

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}
