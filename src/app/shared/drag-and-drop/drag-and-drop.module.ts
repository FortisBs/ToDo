import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { DropzoneDirective } from './dropzone.directive';
import { MovableDirective } from './movable.directive';

@NgModule({
  declarations: [
    DraggableDirective,
    DroppableDirective,
    DropzoneDirective,
    MovableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DraggableDirective,
    DroppableDirective,
    DropzoneDirective,
    MovableDirective
  ]
})
export class DragAndDropModule { }
