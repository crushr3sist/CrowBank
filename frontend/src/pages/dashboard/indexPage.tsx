import savingsCard from "./savingsCard";
import checkingCard from "./checkingCard";
import SpendingChart from "./spendingGraphs";
import { Card } from "@tremor/react";
import TransferCard from "./transferCard";

const IndexPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="w-1/2 p-2">
          {savingsCard()}
          {checkingCard()}
        </div>
        <div className="w-1/2 p-2">
          <div className="h-full">{TransferCard()}</div>
        </div>
      </div>
      <div className="flex-1 p-2">{SpendingChart()}</div>
    </div>
  );
};

export default IndexPage;
