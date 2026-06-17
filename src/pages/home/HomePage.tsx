import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "@chakra-ui/react";
import {
  ShoppingList,
  ShoppingListEmpty,
  ShoppingListError,
  ShoppingListLoading,
} from "../../domains/shopping-list/components";
import { ShoppingListApiService } from "../../domains/shopping-list/services";
import type { IShoppingList } from "../../domains/shopping-list/models";

const shoppingListApiService = new ShoppingListApiService();

function getSelectedListId(
  lists: IShoppingList[],
  shoppingListId?: string,
): number | undefined {
  if (!lists.length) {
    return undefined;
  }

  const parsedId = Number(shoppingListId);
  if (shoppingListId && Number.isFinite(parsedId)) {
    const list = lists.find((entry) => entry.id === parsedId);
    if (list) {
      return list.id;
    }
  }

  return lists[0].id;
}

function getParsedShoppingListId(shoppingListId?: string): number | undefined {
  const parsedId = Number(shoppingListId);
  return shoppingListId && Number.isFinite(parsedId) ? parsedId : undefined;
}

export function HomePage() {
  const { shoppingListId } = useParams<{ shoppingListId?: string }>();
  const navigate = useNavigate();
  const [lists, setLists] = useState<IShoppingList[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoadingLists(true);
    setError(null);

    shoppingListApiService.getLists({
      data: setLists,
      error: setError,
      loading: setLoadingLists,
    });
  }, []);

  const selectedListId = useMemo<number | undefined>(() => {
    return getSelectedListId(lists, shoppingListId);
  }, [lists, shoppingListId]);

  useEffect(() => {
    if (loadingLists || !lists.length || selectedListId === undefined) {
      return;
    }

    const parsedId = getParsedShoppingListId(shoppingListId);
    if (selectedListId !== parsedId) {
      navigate(`/shopping-list/${selectedListId}`, { replace: true });
    }
  }, [loadingLists, lists, selectedListId, shoppingListId, navigate]);

  const loading = loadingLists;

  if (loading) {
    return <ShoppingListLoading />;
  }

  if (error) {
    return <ShoppingListError message={error} />;
  }

  if (!lists.length) {
    return <ShoppingListEmpty />;
  }

  const selectedListValue =
    selectedListId?.toString() ?? lists[0].id.toString();

  const activeList =
    lists.find((list) => list.id === selectedListId) ?? lists[0];

  return (
    <Tabs.Root
      value={selectedListValue}
      onValueChange={({ value }: { value: string }) =>
        navigate(`/shopping-list/${value}`)
      }
    >
      <Tabs.List>
        {lists.map((list) => (
          <Tabs.Trigger key={list.id} value={list.id.toString()}>
            {list.name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content key={activeList.id} value={activeList.id.toString()} p="0">
        <ShoppingList itemIds={activeList.items} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
