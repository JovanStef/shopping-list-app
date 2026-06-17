import { Alert, Text } from "@chakra-ui/react";

export interface ShoppingListErrorProps {
  message: string;
}

export function ShoppingListError({ message }: ShoppingListErrorProps) {
  return (
    <Alert.Root status="error">
      <Alert.Content>
        <Alert.Indicator />
        <Text>{message}</Text>
      </Alert.Content>
    </Alert.Root>
  );
}
