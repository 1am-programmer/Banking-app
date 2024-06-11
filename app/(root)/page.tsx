/*
=> A route group can be created by wrapping a folder's name in parenthesis: (folderName)
For example, if you have routes defined in files within the admin folder like admin/dashboard, admin/users, etc., 
these routes would be accessible via URLs like /admin/dashboard, /admin/users, etc.
=> This approach helps to organize your routes, especially when you have a large number of routes related to a specific feature
 or area of your application.
*/
import React from "react";
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalancebox from "@/components/TotalBalancebox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn });
  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            // user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalancebox
            accounts={accountsData}
            totalBanks={accounts?.totatBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 1250.78 }, { currentBalance: 1345.72 }]}
      />
    </section>
  );
};

export default Home;
