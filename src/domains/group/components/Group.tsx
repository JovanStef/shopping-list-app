import { Accordion, Box, Stack, Text } from "@chakra-ui/react";
import { ShoppingItem } from "../../shopping-item/components";
import type { IShoppingItem } from "../../shopping-item/models";
import type { IGroup } from "../models";

export interface GroupProps {
  group: IGroup;
  itemEntities: Record<string, IShoppingItem>;
  onItemUpdated: (
    id: number,
    checked: boolean,
  ) => { id: number; checked: boolean };
}

export function Group({ group, itemEntities, onItemUpdated }: GroupProps) {
  const groupItems = group.items
    .map((id) => itemEntities[id.toString()])
    .filter((item): item is IShoppingItem => Boolean(item));

  return (
    <Accordion.Item value={group.id.toString()}>
      <Accordion.ItemTrigger px="4" py="3">
        <Box flex="1" textAlign="left">
          <Text fontWeight="semibold">{group.name}</Text>
          <Text fontSize="sm" color="muted">
            {groupItems.length} item{groupItems.length === 1 ? "" : "s"}
          </Text>
        </Box>

        <Accordion.ItemIndicator>
          <Text as="span">▼</Text>
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>

      <Accordion.ItemContent px="4" pb="4" pt="0">
        {groupItems.length === 0 ? (
          <Text>No items available for this group.</Text>
        ) : (
          <Stack gap="3">
            {groupItems.map((item) => (
              <ShoppingItem
                key={item.id}
                {...item}
                onItemUpdated={onItemUpdated}
              />
            ))}
          </Stack>
        )}
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
