import {
  ApiService,
  simulateHttpError,
  simulateHttpResponse,
} from "../../shared/services";
import { IShoppingItem, ShoppingItemModel } from "../models";
import shoppingItems from "../data";
import { ShoppingItemUtilService } from "./shopping-item-util.service";

export class ShoppingItemApiService extends ApiService<IShoppingItem> {
  protected readonly endpointUrl = "/api/shopping-items";
  private readonly data = shoppingItems as IShoppingItem[];
  private readonly shoppingItemUtilsService = new ShoppingItemUtilService();

  getAll(): Promise<IShoppingItem[]> {
    return simulateHttpResponse(this.data);
  }

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
      const items = await simulateHttpResponse(this.data);
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

  getById(id: number): Promise<IShoppingItem> {
    const item = this.data.find((entry) => entry.id === id);

    if (!item) {
      return simulateHttpError(new Error("Shopping item not found"));
    }

    return simulateHttpResponse(item);
  }

  create(
    payload: Omit<IShoppingItem, "id"> | IShoppingItem,
  ): Promise<IShoppingItem> {
    return simulateHttpResponse({
      id: Math.max(...this.data.map((entry) => entry.id)) + 1,
      ...(payload as Omit<IShoppingItem, "id">),
    });
  }

  update(id: number, payload: Partial<IShoppingItem>): Promise<IShoppingItem> {
    const item = this.data.find((entry) => entry.id === id);

    if (!item) {
      return simulateHttpError(new Error("Shopping item not found"));
    }

    return simulateHttpResponse({ ...item, ...payload });
  }

  delete(id: number): Promise<void> {
    return simulateHttpResponse(undefined as void);
  }
}
