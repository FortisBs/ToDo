import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardService } from "../dashboard.service";
import { Board, IBoard } from "../../../shared/models/board.model";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-board-modal',
  templateUrl: './board-modal.component.html',
  styleUrls: ['./board-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('modalAppear', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300)
      ])
    ])
  ]
})
export class BoardModalComponent {
  state = 'opened';
  @Input('item') board!: IBoard;
  @Input() editMode = false;
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(private dashboardService: DashboardService) {}

  closeModal() {
    this.state = 'closed';
    this.editMode = false;
    this.modalClosed.emit(false);
  }

  onAdd(formData: {name: string, description: string}) {
    const newBoard: IBoard = new Board(
      formData.name.trim(),
      formData.description.trim(),
      new Date().toString()
    );
    this.dashboardService.createBoard(newBoard);
    this.closeModal();
  }

  onEdit(formData: {name: string}) {
    this.dashboardService.updateBoard(this.board, formData.name);
    this.closeModal();
  }
}
