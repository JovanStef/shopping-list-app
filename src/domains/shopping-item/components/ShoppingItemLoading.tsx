import { HStack, Spinner, Text } from "@chakra-ui/react";

export function ShoppingItemLoading() {
  return (
    <HStack gap="3">
      <Spinner />
      <Text>Loading shopping items…</Text>
    </HStack>
  );
}
