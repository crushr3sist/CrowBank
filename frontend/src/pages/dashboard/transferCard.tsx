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
import { useState, useEffect } from "react";

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

  // Update the selected value when fromAccount changes
  useEffect(() => {
    const trigger = document.getElementById("fromAccountTrigger");
    if (trigger) {
      trigger.value = fromAccount;
    }
  }, [fromAccount]);

  // Update the selected value when toAccount changes
  useEffect(() => {
    const trigger = document.getElementById("toAccountTrigger");
    if (trigger) {
      trigger.value = toAccount;
    }
  }, [toAccount]);

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
              "w-full py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
          }}
        >
          <DropdownTrigger>
            <Input
              id="fromAccountTrigger"
              placeholder="Select an account"
              readOnly
              onClick={() => setAvailableToAccounts(accountOptions)}
            />
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Accounts">
              {availableToAccounts.map((option) => (
                <DropdownItem
                  key={option}
                  onClick={() => handleFromAccountChange(option)}
                >
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
        >
          <DropdownTrigger>
            <Input
              id="toAccountTrigger"
              placeholder="Select an account"
              readOnly
              onClick={() =>
                setAvailableToAccounts(
                  accountOptions.filter((option) => option !== fromAccount)
                )
              }
            />
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Accounts">
              {availableToAccounts.map((option) => (
                <DropdownItem
                  key={option}
                  onClick={() => handleToAccountChange(option)}
                >
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
      </Card>
    </div>
  );
};

export default TransferCard;
