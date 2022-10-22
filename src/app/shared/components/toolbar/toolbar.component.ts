import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToolbarService } from "./toolbar.service";
import { ToolbarData } from "../../models/toolbar.model";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "../../../features/dashboard/dashboard.service";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  @ViewChild('selectInput', {static: false}) selectInput!: ElementRef;

  boardName!: Observable<string>;
  tasksPage!: boolean;
  data: ToolbarData = {
    searchValue: '',
    sortValue: 'createdAt',
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
      this.boardName = this.dashboardService.getBoard(boardId).pipe(
        map((board) => board.name)
      );
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
