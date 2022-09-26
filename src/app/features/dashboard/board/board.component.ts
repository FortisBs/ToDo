import { Component, Input } from '@angular/core';
import { IBoard } from "../../../shared/models/board.model";
import { DashboardService } from "../dashboard.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input('item') board!: IBoard;
  optionsOpened = false;
  editOpened = false;

  constructor(private dashboardService: DashboardService) {}

  toggleOptions() {
    this.optionsOpened = !this.optionsOpened;
  }

  openEdit() {
    this.editOpened = true;
    this.optionsOpened = false;
  }

  delete() {
    if (this.board.id) {
      this.dashboardService.deleteBoard(this.board.id);
    }
  }
}
