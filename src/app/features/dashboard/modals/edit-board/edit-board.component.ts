import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from "../../dashboard.service";
import { IBoard } from "../../../../shared/models/board.model";

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.scss']
})
export class EditBoardComponent implements OnInit {
  @Input('item') board!: IBoard;
  @Output() modalClosed = new EventEmitter<boolean>();
  newName!: string;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.newName = this.board.name
  }

  closeModal() {
    this.modalClosed.emit(false);
  }

  onSave() {
    this.dashboardService.updateBoard(this.board, this.newName);
    this.closeModal();
  }
}
