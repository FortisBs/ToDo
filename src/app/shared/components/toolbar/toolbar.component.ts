import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToolbarService } from "./toolbar.service";
import { ToolbarData } from "../../models/toolbar.model";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../../features/dashboard/dashboard.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('selectInput', {static: false}) selectInput!: ElementRef;

  boardName!: string;
  tasksPage!: boolean;
  data: ToolbarData = {
    searchValue: '',
    sortValue: (this.tasksPage) ? 'complexity' : 'createdAt',
    ascDirection: false
  }

  constructor(
    private toolbarService: ToolbarService,
    private dashboardService: DashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const boardId: string | undefined = this.route.snapshot.params['id'];
    this.tasksPage = !!boardId;
    if (boardId) {
      this.dashboardService.getBoard(boardId).subscribe({
        next: (board) => this.boardName = board.name
      });
    }
  }

  private captureChanges() {
    this.toolbarService.passData(this.data);
  }

  changeSearchValue(value: string) {
    this.data.searchValue = value;
    this.captureChanges();
  }

  changeSortValue() {
    this.data.sortValue = this.selectInput.nativeElement.value;
    this.captureChanges();
  }

  changeSortDirection() {
    this.data.ascDirection = !this.data.ascDirection;
    this.captureChanges();
  }
}
