export interface IBoard {
  id?: string,
  name: string,
  description: string,
  createdAt: Date
}

export class Board implements IBoard {
  constructor(
    public name: string,
    public description: string,
    public createdAt: Date
  ) {}
}
