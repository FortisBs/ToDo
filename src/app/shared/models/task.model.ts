export type TaskStatus = 'To Do' | 'In Progress' | 'Done' | 'Archived';
export const taskStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Done', 'Archived'];

export interface ITask {
  id?: string,
  name: string,
  complexity: number,
  status: TaskStatus,
  boardId: string,
  createdAt: string,
  comments: IComment[]
}

export class Task implements ITask {
  constructor(
    public name: string,
    public complexity: number,
    public status: TaskStatus,
    public boardId: string,
    public createdAt: string,
    public comments: IComment[] = []
  ) {}
}

export type TaskFormData = { name: string, complexity: number };

export interface IComment {
  createdAt: string,
  text: string
}

export interface OpenedComments {
  taskName: string
  comments: IComment[]
}
