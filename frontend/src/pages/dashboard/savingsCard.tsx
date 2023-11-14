import { Card, Flex, Metric, Text } from "@tremor/react";
import { IDebitCard } from "./interfaces";
import { card } from "@nextui-org/react";

const savingsCard = (debitData) => {
  function cardNumberFormatter(cardNumber: string): string {
    const dashPositions = [4, 8, 12];

    let formattedNumber = "";
    for (let i = 0; i < cardNumber.length; i++) {
      if (dashPositions.includes(i)) {
        formattedNumber += "-";
      }
      formattedNumber += cardNumber[i];
    }
    return formattedNumber;
  }

  return (
    <div>
      <Card className="w-full min-w-xs mx-auto mt-4">
        <h1>Savings</h1>
        <Metric>Available: ${debitData[0].savings}</Metric>
        <Flex className="mt-4">
          <Text>{cardNumberFormatter(debitData[0].CardNumber)}</Text>
        </Flex>
      </Card>
    </div>
  );
};

export default savingsCard;
