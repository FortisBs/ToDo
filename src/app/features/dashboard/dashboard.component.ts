import { Component, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { IBoard } from "../../shared/models/board.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  boards!: IBoard[];
  isModalOpened = false;
  searchValue!: string;
  sortValue: 'createdAt' | 'name' = 'createdAt';
  isAsc = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.initBoards();
    this.dashboardService.dashboardItems$.subscribe((updatedBoards) => {
      this.boards = updatedBoards;
    });
  }

  openModal() {
    this.isModalOpened = true;
  }

}
