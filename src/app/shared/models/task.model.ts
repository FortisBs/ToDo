export type TaskStatus = 'To Do' | 'In Progress' | 'Done' | 'Archived';
export const taskStatuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

export interface ITask {
  id?: string,
  name: string,
  complexity: number,
  status: TaskStatus,
  boardId: string,
  createdAt: string
}

export class Task implements ITask {
  constructor(
    public name: string,
    public complexity: number,
    public status: TaskStatus,
    public boardId: string,
    public createdAt: string
  ) {}
}

export type TaskFormData = { name: string, complexity: number };
