import { Checkbox, HStack } from "@chakra-ui/react";
import type { IShoppingItem } from "../models/shopping-item.model";

export interface ShoppingItemProps extends IShoppingItem {}

export function ShoppingItem(props: ShoppingItemProps) {
  const { id, name, active } = props;

  return (
    <HStack align="center" gap="3" role="listitem">
      <Checkbox.Root
        checked={active}
        variant="outline"
        id={`shopping-item-${id}`}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>{name}</Checkbox.Label>
      </Checkbox.Root>
    </HStack>
  );
}
