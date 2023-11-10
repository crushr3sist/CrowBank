import { Card } from "@tremor/react";
import { Input } from "@nextui-org/react";
const TransferCard = () => {
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
      </Card>
    </div>
  );
};

export default TransferCard;
