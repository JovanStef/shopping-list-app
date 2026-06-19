import { useEffect, useMemo, useState } from "react";
import { Accordion, Stack } from "@chakra-ui/react";
import {
  ShoppingItem,
  ShoppingItemEmpty,
  ShoppingItemError,
  ShoppingItemLoading,
} from "../../shopping-item/components";
import type { IShoppingItem } from "../../shopping-item/models";
import type { IGroup } from "../../group/models";
import { Group } from "../../group/components";
import { ShoppingListFeatureService } from "../services";

export interface ShoppingListProps {
  itemIds: number[];
}

const shopingListFeatureService = new ShoppingListFeatureService();

export function ShoppingList({ itemIds }: ShoppingListProps) {
  const [itemEntities, setItemEntities] = useState<
    Record<string, IShoppingItem>
  >({});
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [itemToGroupMap, setItemToGroupMap] = useState<Record<string, number>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setItemEntities({});
    setGroups([]);
    setItemToGroupMap({});

    shopingListFeatureService.loadShoppingListWithGroups({
      setItemEntities,
      setGroups,
      setItemToGroupMap,
      setLoading,
      setError,
    });
  }, [itemIds]);

  const visibleItemEntities = useMemo(() => {
    return itemIds.reduce<Record<string, IShoppingItem>>((result, id) => {
      const entity = itemEntities[id.toString()];
      if (entity) {
        result[id.toString()] = entity;
      }
      return result;
    }, {});
  }, [itemEntities, itemIds]);

  const ungroupedItemsIds = useMemo(
    () => itemIds.filter((id) => !itemToGroupMap[id.toString()]),
    [itemIds, itemToGroupMap],
  );

  const onItemUpdated = async (id: number, checked: boolean): Promise<void> => {
    const item = itemEntities[id.toString()];
    await item.update({ ...item, active: checked });
    await shopingListFeatureService.loadShoppingListWithGroups({
      setItemEntities,
      setGroups,
      setItemToGroupMap,
      setLoading,
      setError,
    });
  };

  if (loading) {
    return <ShoppingItemLoading />;
  }

  if (error) {
    return <ShoppingItemError message={error} />;
  }

  if (!itemIds?.length) {
    return <ShoppingItemEmpty />;
  }

  return (
    <Stack mt="3" gap="3">
      {groups.length > 0 ? (
        <Accordion.Root
          multiple
          defaultValue={groups.map((group) => group.id.toString())}
        >
          {groups.map((group) => (
            <Group
              key={group.id}
              group={{
                ...group,
              }}
              itemEntities={visibleItemEntities}
              onItemUpdated={onItemUpdated}
            />
          ))}
        </Accordion.Root>
      ) : null}

      {ungroupedItemsIds.length > 0 ? (
        <Stack gap="3">
          {ungroupedItemsIds.map((id) => (
            <ShoppingItem
              key={id}
              {...itemEntities[id.toString()]}
              onItemUpdated={onItemUpdated}
            />
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}
