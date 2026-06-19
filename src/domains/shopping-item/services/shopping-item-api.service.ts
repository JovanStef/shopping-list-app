import { ApiService } from "../../shared/services";
import { IShoppingItem, ShoppingItemModel } from "../models";
import { ShoppingItemUtilService } from "./shopping-item-util.service";

export class ShoppingItemApiService extends ApiService<IShoppingItem> {
  protected readonly collectionName = "items";
  private readonly shoppingItemUtilsService = new ShoppingItemUtilService();

  async getItems({
    data,
    idMap,
    error,
    loading,
  }: {
    data?: (items: IShoppingItem[]) => void;
    idMap?: (enteties: Record<string, IShoppingItem>) => void;
    error?: (msg: string) => void;
    loading?: (loading: boolean) => void;
  }): Promise<void> {
    try {
      const items = await this.getAll();
      const { transformedItems, enteties } =
        this.shoppingItemUtilsService.transform(
          items,
          (item) => new ShoppingItemModel(item.id, item.name, item.active),
        );
      data?.(transformedItems);
      idMap?.(enteties);
    } catch (fetchError) {
      error?.(
        fetchError instanceof Error ? fetchError.message : String(fetchError),
      );
    } finally {
      loading?.(false);
    }
  }

  async getItem({
    id,
    data,
    error,
    loading,
  }: {
    id: number;
    data?: (item: IShoppingItem) => void;
    error?: (msg: string) => void;
    loading?: (loading: boolean) => void;
  }): Promise<void> {
    try {
      const item = await this.getById(id);
      data?.(new ShoppingItemModel(item.id, item.name, item.active));
    } catch (fetchError) {
      error?.(
        fetchError instanceof Error ? fetchError.message : String(fetchError),
      );
    } finally {
      loading?.(false);
    }
  }

  async createItem({
    payload,
    data,
    error,
    loading,
  }: {
    payload: Omit<IShoppingItem, "id"> | IShoppingItem;
    data?: (item: IShoppingItem) => void;
    error?: (msg: string) => void;
    loading?: (loading: boolean) => void;
  }): Promise<void> {
    try {
      const item = await this.create(payload);
      data?.(new ShoppingItemModel(item.id, item.name, item.active));
    } catch (createError) {
      error?.(
        createError instanceof Error
          ? createError.message
          : String(createError),
      );
    } finally {
      loading?.(false);
    }
  }

  async updateItem({
    id,
    payload,
    data,
    error,
    loading,
  }: {
    id: number;
    payload: Partial<IShoppingItem>;
    data?: (item: IShoppingItem) => void;
    error?: (msg: string) => void;
    loading?: (loading: boolean) => void;
  }): Promise<void> {
    try {
      const item = await this.update(id, payload);
      data?.(new ShoppingItemModel(item.id, item.name, item.active));
    } catch (updateError) {
      error?.(
        updateError instanceof Error
          ? updateError.message
          : String(updateError),
      );
    } finally {
      loading?.(false);
    }
  }

  async deleteItem({
    id,
    success,
    error,
    loading,
  }: {
    id: number;
    success?: () => void;
    error?: (msg: string) => void;
    loading?: (loading: boolean) => void;
  }): Promise<void> {
    try {
      await this.delete(id);
      success?.();
    } catch (deleteError) {
      error?.(
        deleteError instanceof Error
          ? deleteError.message
          : String(deleteError),
      );
    } finally {
      loading?.(false);
    }
  }
}
