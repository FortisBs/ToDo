import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { IBoard } from "../../shared/models/board.model";
import { Observable, Subscription } from "rxjs";
import { ToolbarService } from "../../shared/toolbar/toolbar.service";
import { ToolbarData } from "../../shared/models/toolbar.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  boards$!: Observable<IBoard[]>;
  isModalOpened = false;
  toolbarData: ToolbarData = {
    searchValue: '',
    sortValue: 'createdAt',
    ascDirection: false
  };

  constructor(
    private dashboardService: DashboardService,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit(): void {
    this.boards$ = this.dashboardService.dashboardItems$;
    this.dashboardService.initBoards();
    this.subscription = this.toolbarService.getData().subscribe({
      next: (data) => this.toolbarData = data
    });
  }

  openModal() {
    this.isModalOpened = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
