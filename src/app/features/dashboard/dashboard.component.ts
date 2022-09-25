import { Component, OnInit } from '@angular/core';
import { DashboardService } from "./dashboard.service";
import { Observable } from "rxjs";
import { IBoard } from "../../shared/models/board.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isModalOpened = false;
  boards$!: Observable<IBoard[]>;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.boards$ = this.dashboardService.dashboardItems$;
  }

  openModal() {
    this.isModalOpened = true;
  }

}
