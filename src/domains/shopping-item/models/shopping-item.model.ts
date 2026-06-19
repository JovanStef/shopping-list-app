import { ShoppingItemApiService } from "../services";

export interface IShoppingItem {
  id: number;
  name: string;
  active: boolean;
  update: (payload: Partial<IShoppingItem>) => Promise<void>;
  registerLoadingState: (isLoading: (loading: boolean) => void) => void;
}

export class ShoppingItemModel implements IShoppingItem {
  apiService: ShoppingItemApiService;
  isLoading!: (loading: boolean) => void;
  constructor(
    public id = 0,
    public name = "",
    public active = false,
  ) {
    id = id;
    name = name;
    active = active;
    this.apiService = new ShoppingItemApiService();
    this.update = this.update.bind(this);
    this.registerLoadingState = this.registerLoadingState.bind(this);
  }
  registerLoadingState(isLoading: (loading: boolean) => void) {
    this.isLoading = isLoading;
  }
  public async update({ name, active }: Partial<IShoppingItem>): Promise<void> {
    console.log("Updating item:", { id: this.id, name, active });
    this.isLoading?.(true);
    try {
      await this.apiService.updateItem({
        id: this.id,
        payload: {
          id: this.id,
          name: name ?? this.name,
          active: active ?? this.active,
        },
        data: (item) => {
          this.active = item.active;
        },
      });
    } catch (error) {
      console.error("Failed to toggle active state:", error);
    } finally {
      this.isLoading?.(false);
    }
  }
}
