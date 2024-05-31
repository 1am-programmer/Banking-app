import React, { useCallback, useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken } from "@/lib/actions/user.actions";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const router = useRouter();

  const [token, setToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };
    getLinkToken();
  }, [user]);
  //Has a callback function {WHICH CAN NEVER BE ASYNC} and a dependency array, where you want that function to be when it changes

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      //   await exchangePublicToken({
      //     publicToken: public_token,
      //     user,
      //   });

      router.push("/");
    },
    [user]
  );
  //That means it only gets called when the user changes, the one we are passing in the props

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button
          onClick={() => open()}
          disabled={!ready}
          className="plaidlink-primary"
        >
          Connect Button
        </Button>
      ) : variant === "ghost" ? (
        <Button>Connect Button</Button>
      ) : (
        <Button>Connect Button</Button>
      )}
    </>
  );
};

export default PlaidLink;
