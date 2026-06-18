import {
  Button,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Stack,
} from "@chakra-ui/react";
import { type ReactNode } from "react";

interface SharedModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  zIndex?: number;
}

export function SharedModal({
  open,
  title,
  onClose,
  children,
  zIndex,
}: SharedModalProps) {
  const backdropZIndex = zIndex ?? 1000;
  const positionerZIndex = (zIndex ?? 1000) + 100;

  return (
    <DialogRoot
      open={open}
      onOpenChange={(openState) => {
        if (!openState) {
          onClose();
        }
      }}
    >
      <DialogBackdrop
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.35)",
          zIndex: backdropZIndex,
        }}
      />
      <DialogPositioner
        style={{
          position: "fixed",
          insetInlineStart: "50%",
          insetInlineEnd: "auto",
          top: "10%",
          transform: "translateX(-50%)",
          zIndex: positionerZIndex,
        }}
      >
        <DialogContent minW="sm" maxW="lg" position="relative">
          <DialogHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="3"
          >
            <DialogTitle>{title}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </DialogHeader>

          <DialogBody>
            <Stack gap="4">{children}</Stack>
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
