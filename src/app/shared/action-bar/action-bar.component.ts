import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
  @Input() title!: string;
  @Output() searchValue = new EventEmitter<string>();
  @Output() sortValue = new EventEmitter<'createdAt' | 'name'>();
  @Output() ascDirection = new EventEmitter<boolean>();
  @ViewChild('selectInput', {static: false}) selectInput!: ElementRef;
  isAscDirection = false;

  filter(value: string) {
    this.searchValue.emit(value);
  }

  sort() {
    this.sortValue.emit(this.selectInput.nativeElement.value);
  }

  toggleSortDirection() {
    this.isAscDirection = !this.isAscDirection;
    this.ascDirection.emit(this.isAscDirection);
  }
}
