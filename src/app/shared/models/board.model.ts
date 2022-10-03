export interface IBoard {
  id?: string,
  name: string,
  description: string,
  createdAt: string
}

export class Board implements IBoard {
  constructor(
    public name: string,
    public description: string,
    public createdAt: string
  ) {}
}

