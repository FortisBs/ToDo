import { Component, Input, OnInit } from '@angular/core';
import { ITask, Task, TaskFormData, TaskStatus } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() taskStatus!: TaskStatus;
  @Input() filteredTasks!: ITask[];

  tasks!: ITask[];
  isModalOpened = false;
  searchValue = '';

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.tasks = this.filteredTasks;
    this.searchValue = this.tasksService.searchValue;
  }

  openModal() {
    this.isModalOpened = true;
  }

  onAddTask(data: TaskFormData) {
    const task: ITask = new Task(data.name, data.complexity, this.taskStatus, this.tasksService.activeBoard.id!);
    this.tasksService.createTask(task).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
      }
    });
  }

  onDeleteTask(id: string) {
    const index = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(index, 1);
  }

  onUpdateTask(updatedTask: ITask) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    this.tasks[index] = updatedTask;
  }
}
