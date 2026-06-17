import { Outlet } from "react-router-dom";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export function AppLayout() {
  return (
    <Box p="8" minHeight="100vh" width="100vw" bg="bg.surface">
      <VStack gap="8" align="stretch" maxW="4xl" mx="auto">
        <Box textAlign="center">
          <Heading size="6xl">Shopping List App</Heading>
          <Text fontSize="lg" color="fg.muted" mt="4">
            Manage your shopping lists efficiently
          </Text>
        </Box>

        <Box>
          <Heading size="xl" mb="4">
            Shopping Items
          </Heading>

          <Outlet />
        </Box>
      </VStack>
    </Box>
  );
}
