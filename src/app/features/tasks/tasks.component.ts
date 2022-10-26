import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from "./tasks.service";
import { ITask, TaskStatus } from "../../shared/models/task.model";
import { Subscription } from "rxjs";
import { ToolbarData } from "../../shared/models/toolbar.model";
import { ToolbarService } from "../../shared/components/toolbar/toolbar.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  toolbarData: ToolbarData = {
    searchValue: '',
    sortValue: 'createdAt',
    ascDirection: false
  };
  activeTasks = new Map<TaskStatus, ITask[]>();
  archivedTasks: Map<TaskStatus, ITask[]> | null = new Map<TaskStatus, ITask[]>();
  archiveOpened = false;
  isLoading = false;

  constructor(
    private tasksService: TasksService,
    private toolbarService: ToolbarService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription.add(this.tasksService.tasksGroupedByStatus$.subscribe({
      next: (map) => {
        this.splitArchivedTasks(map);
        this.isLoading = false;
      }
    }));
    this.tasksService.initTasks(this.route.snapshot.params['id']);

    this.subscription.add(this.toolbarService.getData().subscribe({
      next: (data) => this.toolbarData = data
    }));
  }

  private splitArchivedTasks(initialMap: Map<TaskStatus, ITask[]>) {
    initialMap.forEach((list, status) => {
      if (status !== 'Archived') {
        this.activeTasks.set(status, list.slice());
        return;
      }

      this.archivedTasks = (list.length)
        ? new Map<TaskStatus, ITask[]>([[status, list]])
        : null;
    });
  }

  disableSort() {
    return 0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
