export interface IGroup {
  id: number;
  name: string;
  items: number[];
}

export class GroupModel implements IGroup {
  constructor(
    public id = 0,
    public name = "",
    public items: number[] = [],
  ) {}
}
