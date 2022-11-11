import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { IBoard } from "../../shared/models/board.model";
import { Observable, Subscription, tap } from "rxjs";
import { ToolbarService } from "../../shared/components/toolbar/toolbar.service";
import { ToolbarData } from "../../shared/models/toolbar.model";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  boards$!: Observable<IBoard[]>;
  isModalOpened = false;
  toolbarData: ToolbarData = {
    searchValue: '',
    sortValue: 'createdAt',
    ascDirection: false
  };
  isLoading = true;

  constructor(
    private dashboardService: DashboardService,
    private toolbarService: ToolbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subscription = this.toolbarService.getData().subscribe({
      next: (data) => this.toolbarData = data
    });
    this.boards$ = this.dashboardService.dashboardItems$.pipe(
      tap(() => this.isLoading = false)
    );
    this.dashboardService.initBoards();
    this.authService.currentPage.next('dashboard');
  }

  openModal() {
    this.isModalOpened = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
