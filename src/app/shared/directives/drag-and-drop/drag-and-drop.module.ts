import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';

@NgModule({
  declarations: [
    DraggableDirective,
    DroppableDirective
  ],
  imports: [CommonModule],
  exports: [
    DraggableDirective,
    DroppableDirective
  ]
})
export class DragAndDropModule { }
