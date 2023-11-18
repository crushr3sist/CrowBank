import {
  Card,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { useState } from "react";

const TransferCard = () => {
  const accountOptions = ["Savings", "Balance", "Investment"];

  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [availableToAccounts, setAvailableToAccounts] =
    useState(accountOptions);

  const handleFromAccountChange = (selectedAccount) => {
    setFromAccount(selectedAccount);
    setAvailableToAccounts(
      accountOptions.filter((option) => option !== selectedAccount)
    );
  };

  const handleToAccountChange = (selectedAccount) => {
    setToAccount(selectedAccount);
  };

  const handleTransfer = () => {
    console.log(`Transfer from ${fromAccount} to ${toAccount}`);
    setFromAccount("");
    setToAccount("");
    setAvailableToAccounts(
      accountOptions.filter((option) => option !== fromAccount)
    );
  };

  return (
    <div>
      <Card className="w-full min-w-xs mx-auto mt-4 h-full">
        <h1>Transfer</h1>
        <h3>from</h3>
        <Dropdown
          showArrow
          classNames={{
            base: "before:bg-default-200",
            content:
              "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
          }}
          onSelect={handleFromAccountChange}
          value={fromAccount}
        >
          <DropdownTrigger>
            <Button variant="bordered">
              {fromAccount || "Select an account"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Accounts">
              {accountOptions.map((option) => (
                <DropdownItem key={option} value={option}>
                  {option}
                </DropdownItem>
              ))}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <h3 className="p-1">to</h3>
        <Dropdown
          showArrow
          classNames={{
            base: "before:bg-default-200",
            content:
              "w-full py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
          }}
          onSelect={handleToAccountChange}
          value={toAccount}
        >
          <DropdownTrigger>
            <Button variant="bordered">
              {toAccount || "Select an account"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Accounts">
              {availableToAccounts.map((option) => (
                <DropdownItem key={option} value={option}>
                  {option}
                </DropdownItem>
              ))}
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <h3 className="p-1">Amount</h3>
        <Input className="p-1" placeholder="$"></Input>

        <Button onClick={handleTransfer} disabled={!fromAccount || !toAccount}>
          Transfer
        </Button>
        {fromAccount}
        {toAccount}
      </Card>
    </div>
  );
};

export default TransferCard;
