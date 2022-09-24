import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from "@angular/forms";
import { DashboardService } from "../dashboard.service";
import { IBoard } from "../../../shared/models/board.model";

@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.component.html',
  styleUrls: ['./dashboard-modal.component.scss']
})
export class DashboardModalComponent {
  @Output() modalClosed = new EventEmitter<boolean>();
  boards: IBoard[] = [];

  constructor(private dashboardService: DashboardService) {}

  closeModal() {
    this.modalClosed.emit(false);
  }

  onSubmit(form: NgForm) {
    this.boards.push({ id: this.boards.length, createdAt: new Date(), ...form.value });
    this.dashboardService.createBoard(this.boards);
  }
}
