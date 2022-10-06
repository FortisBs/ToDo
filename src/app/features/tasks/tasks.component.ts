import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from "./tasks.service";
import { ITask, TaskStatus } from "../../shared/models/task.model";
import { Observable, Subscription } from "rxjs";
import { ToolbarData } from "../../shared/models/toolbar.model";
import { ToolbarService } from "../../shared/components/toolbar/toolbar.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  taskLists$!: Observable<Map<TaskStatus, ITask[]>>;
  toolbarData: ToolbarData = {
    searchValue: '',
    sortValue: 'createdAt',
    ascDirection: false
  };
  private subscription!: Subscription;

  constructor(
    private tasksService: TasksService,
    private toolbarService: ToolbarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskLists$ = this.tasksService.tasksGroupedByStatus$;
    this.tasksService.initTasks(this.route.snapshot.params['id']);
    this.subscription = this.toolbarService.getData().subscribe({
      next: (data) => this.toolbarData = data
    });
  }

  disableSort() {
    return 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
