import { Card } from "@tremor/react";
import { Button, Input } from "@nextui-org/react";
import { DebitCardsState } from "./interfaces";
const TransferCard = (debitData: DebitCardsState) => {
  return (
    <div>
      <Card className="w-full min-w-xs mx-auto mt-4  h-full">
        <h1>Transfer</h1>
        <h3>from</h3>
        <Input type="dropdown" className="p-1"></Input>
        <h3 className="p-1">to</h3>
        <Input className="p-1"></Input>
        <h3 className="p-1">Amount</h3>
        <Input className="p-1" placeholder="$"></Input>
        <Button className="mt-4 w-full">Transfer</Button>
      </Card>
    </div>
  );
};

export default TransferCard;
