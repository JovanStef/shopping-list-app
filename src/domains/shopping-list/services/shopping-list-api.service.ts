import {
  ApiService,
  simulateHttpError,
  simulateHttpResponse,
} from "../../shared/services";
import { IShoppingList } from "../models";
import shoppingListData from "../data";

export class ShoppingListApiService extends ApiService<IShoppingList> {
  protected readonly endpointUrl = "/api/shopping-lists";
  private readonly data = shoppingListData as IShoppingList[];

  getAll(): Promise<IShoppingList[]> {
    return simulateHttpResponse(this.data);
  }

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
      const lists = await simulateHttpResponse(this.data);
      data?.(lists);
    } catch (fetchError) {
      error?.(
        fetchError instanceof Error ? fetchError.message : String(fetchError),
      );
    } finally {
      loading?.(false);
    }
  }

  getById(id: number): Promise<IShoppingList> {
    const list = this.data.find((entry) => entry.id === id);

    if (!list) {
      return simulateHttpError(new Error("Shopping list not found"));
    }

    return simulateHttpResponse(list);
  }

  create(
    payload: Omit<IShoppingList, "id"> | IShoppingList,
  ): Promise<IShoppingList> {
    const nextId = this.data.length
      ? Math.max(...this.data.map((entry) => entry.id)) + 1
      : 1;

    return simulateHttpResponse({
      id: nextId,
      ...(payload as Omit<IShoppingList, "id">),
    });
  }

  update(id: number, payload: Partial<IShoppingList>): Promise<IShoppingList> {
    const list = this.data.find((entry) => entry.id === id);

    if (!list) {
      return simulateHttpError(new Error("Shopping list not found"));
    }

    return simulateHttpResponse({ ...list, ...payload });
  }

  delete(id: number): Promise<void> {
    const list = this.data.find((entry) => entry.id === id);

    if (!list) {
      return simulateHttpError(new Error("Shopping list not found"));
    }

    return simulateHttpResponse(undefined as void);
  }
}
