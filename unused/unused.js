// https://cloud.appwrite.io/console/project-664857ee0034fd714bc5/auth

// https://appwrite.io/docs/quick-starts/nextjs
// import { createAdminClient, createSessionClient } from "../appwrite";
// import { cookies } from "next/headers";
// import { parseStringify } from "../utils";

// export const signIn = async ({ email, password }: signInProps) => {
//   try {
//     //Mutation / Database / Make fetch

//     const { account } = await createAdminClient();

//     const response = await account.createEmailPasswordSession(email, password);
//     return parseStringify(response);
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

// export const signUp = async (userData: SignUpParams) => {
//   const { email, password, firstName, lastName } = userData;
//   try {
//     //Mutation / Database / Make fetch
//     const { account } = await createAdminClient();
//     const newUserAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       `${firstName} ${lastName}`
//     );
//     const session = await account.createEmailPasswordSession(email, password);

//     cookies().set("appwrite-session", session.secret, {
//       path: "/",
//       httpOnly: true,
//       sameSite: "strict",
//       secure: true,
//     });

//     return parseStringify(newUserAccount);
//     /*parseStringify is a special utility function that runs JSon. parse and stringify on the user object,
// Because in next js, you cannot parse large objects which is the neter user objects, just like tghat in through server actions
// Rather we have to stringify them first
//     */
//   } catch (error) {
//     console.error("Error", error);
//   }
// };

// // ... your initilization functions

// export async function getLoggedInUser() {
//   try {
//     const { account } = await createSessionClient();

//     const user = await account.get();
//     return parseStringify(user);
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// export const logoutAccount = async () => {
//   try {
//     const { account } = await createSessionClient();

//     cookies().delete("appwrite-session");

//     await account.deleteSession("Current");
//   } catch (error) {
//     return null;
//   }
// };

// SENTRY_AUTH_TOKEN=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
