import { Outlet } from "react-router-dom";
import { useMemo } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import {
  FloatingActionMenu,
  SharedModal,
} from "../../domains/shared/components";
import { Toaster } from "../ui/toaster";
import { useModalState } from "../../domains/shared/hooks/use-modal.service";
import {
  modalService,
  type ModalView,
} from "../../domains/shared/services/modal.service";
import { CreateCategoryModal } from "../../domains/category/components/CreateCategoryModal";
import { CreateGroupModal } from "../../domains/group/components/CreateGroupModal";
import { CreateShoppingItemModal } from "../../domains/shopping-item/components/CreateShoppingItemModal";
import { CreateShoppingListModal } from "../../domains/shopping-list/components/CreateShoppingListModal";

const modalTitleMap = {
  "shopping-list": "Create shopping list",
  category: "Create category",
  group: "Create group",
  "shopping-item": "Create shopping item",
};

export function AppLayout() {
  const modalState = useModalState();

  const renderModalContent = (view: ModalView, onClose: () => void) => {
    switch (view) {
      case "shopping-list":
        return <CreateShoppingListModal onClose={onClose} />;
      case "category":
        return <CreateCategoryModal onClose={onClose} />;
      case "group":
        return <CreateGroupModal onClose={onClose} />;
      case "shopping-item":
        return <CreateShoppingItemModal onClose={onClose} />;
      default:
        return null;
    }
  };

  const modalStack = useMemo(
    () =>
      modalState.stack.map((stackItem, index) => (
        <SharedModal
          key={`${stackItem.view}-${index}`}
          open
          title={modalTitleMap[stackItem.view]}
          onClose={() => modalService.close(index)}
          zIndex={1000 + index * 10}
        >
          {renderModalContent(stackItem.view, () => modalService.close(index))}
        </SharedModal>
      )),
    [modalState.stack],
  );

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

      {modalStack}
      <FloatingActionMenu />
      <Toaster />
    </Box>
  );
}
