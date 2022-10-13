import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from "@angular/cdk/overlay";

import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';
import { DropzoneDirective } from './dropzone.directive';
import { DragAndDropService } from "./drag-and-drop.service";
import { DraggableHelperDirective } from './draggable-helper.directive';

@NgModule({
  declarations: [
    DraggableDirective,
    DroppableDirective,
    DropzoneDirective,
    DraggableHelperDirective
  ],
  imports: [
    CommonModule,
    OverlayModule
  ],
  exports: [
    DraggableDirective,
    DroppableDirective,
    DropzoneDirective,
    DraggableHelperDirective
  ],
  providers: [DragAndDropService]
})
export class DragAndDropModule {}
