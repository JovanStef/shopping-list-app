import { ApiService } from "../../shared/services";
import { IShoppingList } from "../models";

export class ShoppingListApiService extends ApiService<IShoppingList> {
  protected readonly collectionName = "lists";

  async getLists({
    data,
    error,
    loading,
  }: {
    data?: (lists: IShoppingList[]) => void;
    error?: (msg: string) => void;
    loading?: (loading: boolean) => void;
  }): Promise<void> {
    try {
      const lists = await this.getAll();
      data?.(lists);
    } catch (fetchError) {
      error?.(
        fetchError instanceof Error ? fetchError.message : String(fetchError),
      );
    } finally {
      loading?.(false);
    }
  }
}
