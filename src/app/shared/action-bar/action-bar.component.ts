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
  @ViewChild('selectInput', {static: false}) selectInput!: ElementRef;

  filter(value: string) {
    this.searchValue.emit(value);
  }

  sort() {
    this.sortValue.emit(this.selectInput.nativeElement.value);
  }
}
