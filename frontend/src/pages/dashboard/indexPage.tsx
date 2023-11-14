import savingsCard from "./savingsCard";
import checkingCard from "./checkingCard";
import TransferCard from "./transferCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { IDebitCard } from "./interfaces";
import { Spinner } from "@nextui-org/react";

const IndexPage = () => {
  const [fetchedData, setFetchedData] = useState<IDebitCard | null>(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error("Error fetching account data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Spinner />
          <p>Your data is loading</p>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default IndexPage;
