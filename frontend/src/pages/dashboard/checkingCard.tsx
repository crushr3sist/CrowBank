import { Card, Flex, Metric, Text } from "@tremor/react";
const checkingCard = (debitData) => {
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
        <h1>Checking</h1>
        <Metric>Available: $ {debitData[0].balance}</Metric>
        <Flex className="mt-4">
          <Text>{cardNumberFormatter(debitData[0].CardNumber)}</Text>
        </Flex>
      </Card>
    </div>
  );
};

export default checkingCard;
