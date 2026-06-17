import { Alert, Text } from "@chakra-ui/react";

export interface ShoppingItemErrorProps {
  message: string;
}

export function ShoppingItemError({ message }: ShoppingItemErrorProps) {
  return (
    <Alert.Root status="error">
      <Alert.Content>
        <Alert.Indicator />
        <Text>{message}</Text>
      </Alert.Content>
    </Alert.Root>
  );
}
