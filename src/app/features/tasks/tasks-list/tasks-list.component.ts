import { Component, Input, OnInit } from '@angular/core';
import { ITask, Task, TaskStatus } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";
import { TaskFormData } from "../modals/add-task/add-task.component";

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

  onAddTask(data: TaskFormData) {
    console.log(data.storyPoints)
    const task: ITask = new Task(data.name, data.storyPoints, this.taskStatus, this.tasksService.activeBoard.id!);

    this.tasksService.createTask(task).subscribe({
      next: (newTask) => {
        this.tasks.push(newTask);
        console.log(this.tasks)
      }
    });
  }

  openModal() {
    this.isModalOpened = true;
  }

}
