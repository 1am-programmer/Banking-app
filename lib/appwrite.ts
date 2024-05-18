// src/lib/server/appwrite.ts
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";

/*We are creating a new client, and setting it's endpoints and projects so the appwrite client knows which appwrite project it should modify
And this function is responsible for creating a session, so that everytime we try to get a session, it will validate it and ensure this is the right
app write session

*/
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) //Adding an exclamation mark makes typscript know that we have it in our environmental variable, so it wont return undefined
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");
  //Checks if a session exists, if no it returns no Session
  if (!session || !session.value) {
    throw new Error("No session");
  }
  //If it does, then we attach this session to this client
  client.setSession(session.value);

  //That way anytime it wants to get access to that session, it uses this get method.. same for the admin client
  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get user() {
      return new Users(client);
    },
  };
}
