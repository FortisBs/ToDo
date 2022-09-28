import { Component, Input, OnInit } from '@angular/core';
import { ITask, TaskStatus } from "../../../shared/models/task.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() taskStatus!: TaskStatus;
  @Input() tasks!: ITask[];

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  onAddTask() {
    this.tasksService.createTask(this.taskStatus).subscribe({
      next: (newTask) => {
        console.log(newTask)
        this.tasks.push(newTask);
        console.log(this.tasks)
      }
    });
  }

}
