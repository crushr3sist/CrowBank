import savingsCard from "./savingsCard";
import checkingCard from "./checkingCard";
import SpendingChart from "./spendingGraphs";
import { Card } from "@tremor/react";
import TransferCard from "./transferCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { IDebitCard } from "./interfaces";
import { Spinner } from "@nextui-org/react";

const IndexPage = () => {
  const [fetchedData, setFetchedData] = useState<IDebitCard>();
  const [fetched, setFetched] = useState(false);

  const fetchAccountData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/accounts/fetch", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setFetchedData(response.data);
      setFetched(true);
    } catch (error) {
      console.error("Error fetching account data:", error.message);
    }
  };

  useEffect(() => {
    (async () => await fetchAccountData())();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {fetched ? (
        <div className="flex-1 flex ml-2 mr-2 -mb-40">
          <div className="w-1/2 p-2">
            {savingsCard(fetchedData)}
            {checkingCard(fetchedData)}
          </div>
          <div className="w-1/2 p-2 ">
            <div className="h-full flex-col flex-grow">
              {TransferCard(fetchedData)}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex flex-col items-center justify-center">
          <Spinner />
          <p>your data is loading</p>
        </div>
      )}
    </div>
  );
};

export default IndexPage;

{
  /* <div className="flex-1 p-2 -mb-1">{SpendingChart()}</div> */
}
