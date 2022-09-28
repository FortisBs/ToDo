export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

export interface ITask {
  id?: string,
  name: string,
  storyPoints: number,
  status: TaskStatus,
  boardId: string
}

export class Task implements ITask {
  constructor(
    public name: string,
    public storyPoints: number,
    public status: TaskStatus,
    public boardId: string
  ) {}
}
