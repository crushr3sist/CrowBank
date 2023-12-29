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

  // Check if debitData and debitData[0] are defined
  if (!debitData || !debitData[0]) {
    return <></>; // or you can render a default component when data is not available
  }

  return (
    <div>
      <Card className="w-full min-w-xs mx-auto mt-4">
        <h1>Checking</h1>
        {/* Check if 'balance' property is available in debitData[0] */}
        <Metric>Available: $ {debitData[0].balance || 0}</Metric>
        <Flex className="mt-4">
          {/* Check if 'CardNumber' property is available in debitData[0] */}
          <Text>{cardNumberFormatter(debitData[0].CardNumber) || 0}</Text>
        </Flex>
      </Card>
    </div>
  );
};

export default checkingCard;
