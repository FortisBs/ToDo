import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToolbarService } from "./toolbar.service";
import { ToolbarData } from "../models/toolbar.model";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() title!: string;
  @ViewChild('selectInput', {static: false}) selectInput!: ElementRef;

  tasksPage!: boolean;
  data: ToolbarData = {
    searchValue: '',
    sortValue: (this.tasksPage) ? 'complexity' : 'createdAt',
    ascDirection: false
  }

  constructor(private toolbarService: ToolbarService) {}

  ngOnInit(): void {
    this.tasksPage = this.title !== 'Dashboard';
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
