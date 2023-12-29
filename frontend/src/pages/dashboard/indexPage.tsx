import savingsCard from "./savingsCard";
import checkingCard from "./checkingCard";
import TransferCard from "./transferCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { IDebitCard } from "./interfaces";
import { Spinner } from "@nextui-org/react";

const IndexPage = () => {
  const [fetchedData, setFetchedData] = useState<IDebitCard | number>();
  const [accountCount, setAccountCount] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchAccountData = async () => {
    try {
      const token = localStorage.getItem("token");
      const _accountCount = await axios.get(
        "http://localhost:8000/accounts/count",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccountCount(_accountCount.data.count);
      if ((accountCount as unknown as number) !== 0) {
        const response = await axios.get(
          "http://localhost:8000/accounts/fetch",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFetchedData(response.data);
      } else {
        setFetchedData(0);
      }
    } catch (error) {
      console.error("Error fetching account data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  console.log(accountCount);

  return (
    <div className="h-screen flex flex-col">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
          <p>Your data is loading</p>
        </div>
      ) : (
        <>
          {accountCount !== 0 ? (
            <div className="flex-1 flex ml-2 mr-2 -mb-40">
              <div className="w-1/2 p-2">
                {savingsCard(fetchedData)}
                {checkingCard(fetchedData)}
              </div>
              <div className="w-1/2 p-2">
                <div className="h-full flex-col flex-grow">
                  <TransferCard />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1>you currently don't have any open accounts</h1>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default IndexPage;
