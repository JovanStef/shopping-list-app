export interface IShoppingList {
  id: number;
  name: string;
  items: number[];
}

export class ShoppingListModel implements IShoppingList {
  constructor(
    public id = 0,
    public name = "",
    public items: number[] = [],
  ) {}
}
