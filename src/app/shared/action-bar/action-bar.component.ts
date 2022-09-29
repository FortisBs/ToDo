import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TasksService } from "../../features/tasks/tasks.service";

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  @Input() title!: string;
  @Output() searchValue = new EventEmitter<string>();
  @Output() sortValue = new EventEmitter<'createdAt' | 'name'>();
  @Output() ascDirection = new EventEmitter<boolean>();
  @ViewChild('selectInput', {static: false}) selectInput!: ElementRef;

  constructor(private tasksService: TasksService) {}

  tasksPage!: boolean;
  isAscDirection = false;

  ngOnInit(): void {
    this.tasksPage = this.title !== 'Dashboard';
  }

  filter(value: string) {
    this.searchValue.emit(value);
    this.tasksService.searchValue = value;
  }

  sort() {
    this.sortValue.emit(this.selectInput.nativeElement.value);
  }

  toggleSortDirection() {
    this.isAscDirection = !this.isAscDirection;
    this.ascDirection.emit(this.isAscDirection);
  }
}
