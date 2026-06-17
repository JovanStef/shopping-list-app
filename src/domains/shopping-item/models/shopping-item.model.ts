export interface IShoppingItem {
  id: number;
  name: string;
  active: boolean;
}

export class ShoppingItemModel implements IShoppingItem {
  constructor(
    public id = 0,
    public name = "",
    public active = false,
  ) {}
}
