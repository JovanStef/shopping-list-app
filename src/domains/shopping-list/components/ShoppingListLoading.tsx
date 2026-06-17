import { HStack, Spinner, Text } from "@chakra-ui/react";

export function ShoppingListLoading() {
  return (
    <HStack gap="3">
      <Spinner />
      <Text>Loading shopping lists…</Text>
    </HStack>
  );
}
