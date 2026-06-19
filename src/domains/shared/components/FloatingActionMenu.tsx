import { useState } from "react";
import { Box, Button, IconButton, Portal, Stack } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { modalService } from "../services/modal.service";

const actions = [
  { label: "Shopping list", view: "shopping-list" as const },
  { label: "Shopping item", view: "shopping-item" as const },
  { label: "Group", view: "group" as const },
  { label: "Category", view: "category" as const },
];

export function FloatingActionMenu() {
  const [open, setOpen] = useState(false);

  const handleAction = (view: (typeof actions)[number]["view"]) => {
    setOpen(false);
    modalService.open(view);
  };

  return (
    <Portal>
      <Box position="fixed" bottom="5" right="5" zIndex="sticky">
        <Stack align="end" spacing="3">
          {open &&
            actions.map((action) => (
              <Button
                key={action.view}
                size="sm"
                onClick={() => handleAction(action.view)}
                width="full"
              >
                {action.label}
              </Button>
            ))}
          <IconButton
            aria-label="Create new item"
            icon={<FiPlus />}
            onClick={() => setOpen((current) => !current)}
            size="lg"
            colorScheme="blue"
            borderRadius="full"
          >
            <FiPlus />
          </IconButton>
        </Stack>
      </Box>
    </Portal>
  );
}
