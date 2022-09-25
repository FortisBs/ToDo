import { Component, Input } from '@angular/core';
import { IBoard } from "../../../shared/models/board.model";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss']
})
export class DashboardItemComponent {
  @Input('item') board!: IBoard;
  optionsOpened = false;

  constructor(private dashboardService: DashboardService) {}

  toggleOptions() {
    this.optionsOpened = !this.optionsOpened;
  }

  delete() {
    this.dashboardService.deleteBoard(this.board.id);
  }
}
