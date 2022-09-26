import { Component, EventEmitter, Output } from '@angular/core';
import { DashboardService } from "../../dashboard.service";
import { Board, IBoard } from "../../../../shared/models/board.model";

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent {
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(private dashboardService: DashboardService) {}

  closeModal() {
    this.modalClosed.emit(false);
  }

  onSubmit(formData: {name: string, description: string}) {
    const newBoard: IBoard = new Board(formData.name, formData.description, new Date());
    this.dashboardService.createBoard(newBoard);
    this.closeModal();
  }
}
