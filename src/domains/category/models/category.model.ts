export interface ICategory {
  id: number;
  name: string;
  items: number[];
}

export class CategoryModel implements ICategory {
  constructor(
    public id = 0,
    public name = "",
    public items: number[] = [],
  ) {}
}
