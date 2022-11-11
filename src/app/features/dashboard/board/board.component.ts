import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IBoard } from "../../../shared/models/board.model";
import { DashboardService } from "../dashboard.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {
  @Input('item') board!: IBoard;
  optionsOpened = false;
  editOpened = false;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  toggleOptions(event: MouseEvent) {
    event.stopPropagation();
    this.optionsOpened = !this.optionsOpened;
  }

  openEdit(event: MouseEvent) {
    event.stopPropagation();
    this.editOpened = true;
    this.optionsOpened = false;
  }

  delete(event: MouseEvent) {
    event.stopPropagation();
    if (this.board.id) {
      this.dashboardService.deleteBoard(this.board.id);
    }
  }

  openBoard() {
    this.router.navigate(['/dashboard/' + this.board.id]);
  }
}
