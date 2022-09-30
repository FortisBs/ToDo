import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardService } from "../dashboard.service";
import { Board, IBoard } from "../../../shared/models/board.model";

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss']
})
export class BoardModalComponent {
  @Input('item') board!: IBoard;
  @Input() editMode = false;
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(private dashboardService: DashboardService) {}

  closeModal() {
    this.editMode = false;
    this.modalClosed.emit(false);
  }

  onAdd(formData: {name: string, description: string}) {
    const newBoard: IBoard = new Board(formData.name, formData.description, new Date().toString());
    this.dashboardService.createBoard(newBoard);
    this.closeModal();
  }

  onEdit(formData: {name: string}) {
    this.dashboardService.updateBoard(this.board, formData.name);
    this.closeModal();
  }
}
