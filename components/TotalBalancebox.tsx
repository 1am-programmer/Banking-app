import { formatAmount } from "@/lib/utils";
import React from "react";
import Animatedcounter from "./Animatedcounter";
import Doughnutchart from "./Doughnutchart";

const TotalBalancebox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section className="total-balance">
      {/* Div for the chart */}
      <div className="total-balance-chart">
        <Doughnutchart accounts={accounts} />
      </div>

      {/* Div for the connected bank accounts */}
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts:{totalBanks} </h2>
        {/* Div for the current balance */}
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          {/* Display current balance, formatted using query string */}
          <div className="total-balance-amount flex-center gap-2">
            <Animatedcounter amount={totalCurrentBalance} />
            {/* {formatAmount()} Replaced by the animated counter */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalBalancebox;
