import { Component, EventEmitter, Output } from '@angular/core';
import { DashboardService } from "../dashboard.service";

@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.component.html',
  styleUrls: ['./dashboard-modal.component.scss']
})
export class DashboardModalComponent {
  @Output() modalClosed = new EventEmitter<boolean>();

  constructor(private dashboardService: DashboardService) {}

  closeModal() {
    this.modalClosed.emit(false);
  }

  onSubmit(formData: {name: string, description: string}) {
    this.dashboardService.createBoard(formData);
  }
}
