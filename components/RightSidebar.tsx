import React from "react";
import Link from "next/link";
import Image from "next/image";
import Bankcard from "./Bankcard";
import { countTransactionCategories } from "@/lib/utils";
import { CategoryScale } from "chart.js";
import Category from "./Category";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
  const categories: CategoryCount[] = countTransactionCategories(transactions);

  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />

        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user.firstName[0]}
              {/* {user.firstName[0]} */}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user.firstName}
              {user.lastName}

              {/* {user.firstName} */}
            </h1>

            <p className="profile-email">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href={"/"} className="flex gap-2">
            <Image src={"icons/plus.svg"} height={20} width={20} alt="image" />
            <h2 className="text-14 font-semibold text-gray-600"> Add banks</h2>
          </Link>
        </div>

        {/* IF we have a bank connected, or banks are greater than 0, return this div.. */}
        {banks?.length > 0 && (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <Bankcard
                key={banks[0].$id}
                account={banks[0]}
                // userName={`${user.firstName} ${user.lastName}`}
                userName={user.firstName}
                showBalance={false}
              />
            </div>
            {/* IF banks and Index[1] i.e a 2nd bank because index 1 is the 2nd item in an array, return this div  */}
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <Bankcard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  // userName={user.firstName}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}

        <div className="mt-10 flex flex-1 flex-col gap-6">
          <h2 className="header-2">Top categories</h2>

          <div className="space-y-5">
            {categories.map((category, index) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
