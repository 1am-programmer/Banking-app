"use client";
import React from "react";
import CountUp from "react-countup";

const Animatedcounter = ({ amount }: { amount: number }) => {
  //Which means the type of amount is a number
  return (
    <div className="w-full">
      <CountUp
        decimal="."
        prefix="$"
        end={amount}
        // duration={2.75}
        decimals={2}
      />
      {/* A react library that counts up  to a certain number */}
    </div>
  );
};

export default Animatedcounter;
