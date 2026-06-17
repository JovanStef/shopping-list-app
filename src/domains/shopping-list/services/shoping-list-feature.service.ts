import { GroupApiService, IGroup } from "../../group";
import { ShoppingItemApiService, IShoppingItem } from "../../shopping-item";

export class ShoppingListFeatureService {
  shoppingItemApiService = new ShoppingItemApiService();
  groupApiService = new GroupApiService();

  async loadShoppingListWithGroups({
    setItems,
    setItemEntities,
    setGroups,
    setItemToGroupMap,
    setLoading,
    setError,
  }: {
    setItems?: (items: IShoppingItem[]) => void;
    setItemEntities?: (enteties: Record<string, IShoppingItem>) => void;
    setGroups?: (groups: IGroup[]) => void;
    setItemToGroupMap?: (itemGroupMap: Record<string, number>) => void;
    setLoading?: (loading: boolean) => void;
    setError?: (msg: string) => void;
  }): Promise<void> {
    try {
      await Promise.all([
        this.shoppingItemApiService.getItems({
          data: setItems,
          idMap: setItemEntities,
          error: setError,
        }),
        this.groupApiService.getItems({
          data: setGroups,
          idMap: undefined,
          itemToGroupMap: setItemToGroupMap,
          error: setError,
        }),
      ]);
    } catch (fetchError) {
      setError?.(
        fetchError instanceof Error ? fetchError.message : String(fetchError),
      );
    } finally {
      setLoading?.(false);
    }
  }
}
