export interface IBoard {
  id: number,
  name: string,
  description: string,
  createdAt: Date
}

export class Board implements IBoard {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public createdAt: Date
  ) {}
}
