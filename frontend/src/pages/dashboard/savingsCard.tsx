import { Card, Flex, Metric, Text } from "@tremor/react";

const savingsCard = () => {
  return (
    <div>
      <Card className="w-full min-w-xs mx-auto mt-4">
        <h1>Savings</h1>
        <Metric>Available: $ 71,465</Metric>
        <Flex className="mt-4">
          <Text>{"{card number}"}</Text>
          <Text>{"${balance}"}</Text>
          <Text>$ 225,000</Text>
        </Flex>
      </Card>
    </div>
  );
};

export default savingsCard;
