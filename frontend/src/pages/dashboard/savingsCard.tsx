import { Card, Flex, Metric, Text } from "@tremor/react";

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

  // Check if debitData[0] is defined
  if (!debitData || !debitData[0]) {
    return <></>; // or you can render a default component when data is not available
  }

  return (
    <div>
      {debitData !== 0 ? (
        <>
          <Card className="w-full min-w-xs mx-auto mt-4">
            <h1>Savings</h1>
            <Metric>Available: ${debitData[0].savings || 0}</Metric>
            <Flex className="mt-4">
              <Text>{cardNumberFormatter(debitData[0].CardNumber) || 0}</Text>
            </Flex>
          </Card>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default savingsCard;
