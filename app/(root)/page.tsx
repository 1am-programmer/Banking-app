/*
=> A route group can be created by wrapping a folder's name in parenthesis: (folderName)
For example, if you have routes defined in files within the admin folder like admin/dashboard, admin/users, etc., 
these routes would be accessible via URLs like /admin/dashboard, /admin/users, etc.
=> This approach helps to organize your routes, especially when you have a large number of routes related to a specific feature
 or area of your application.
*/
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalancebox from "@/components/TotalBalancebox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
// import { get } from "http";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalancebox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
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
