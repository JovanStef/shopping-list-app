import {
  Checkbox,
  CheckboxCheckedChangeDetails,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import type { IShoppingItem } from "../models/shopping-item.model";
import { useState } from "react";

export interface ShoppingItemProps extends IShoppingItem {
  onItemUpdated: (
    id: number,
    checked: boolean,
  ) => { id: number; checked: boolean };
}

export function ShoppingItem({
  id,
  name,
  active,
  registerLoadingState,
  onItemUpdated,
}: ShoppingItemProps) {
  const [loading, setLoading] = useState(false);
  registerLoadingState(setLoading);
  return (
    <HStack align="center" gap="3" role="listitem">
      <Checkbox.Root
        checked={active}
        variant="outline"
        id={`shopping-item-${id}`}
        onCheckedChange={(checkbox: CheckboxCheckedChangeDetails) =>
          onItemUpdated(id, checkbox.checked as boolean)
        }
      >
        <Checkbox.HiddenInput />
        {loading ? <Spinner /> : <Checkbox.Control />}
        <Checkbox.Label>{name}</Checkbox.Label>
      </Checkbox.Root>
    </HStack>
  );
}
