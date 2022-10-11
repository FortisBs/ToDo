import { Directive, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { DragAndDropService } from "./drag-and-drop.service";

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective implements OnInit {
  @HostBinding('class.dropzone-activated') activated = false;
  @HostBinding('class.dropzone-entered') entered = false;

  @Output() drop = new EventEmitter<PointerEvent>();

  constructor(private dragAndDropService: DragAndDropService) {}

  ngOnInit(): void {
    this.dragAndDropService.dragStart$.subscribe(() => this.onDragStart());
    this.dragAndDropService.dragEnd$.subscribe((event) => this.onDragEnd(event));
  }

  @HostListener('pointerenter') onPointerEnter(): void {
    if (!this.activated) return;
    this.entered = true;
  }

  @HostListener('pointerleave') onPointerLeave(): void {
    if (!this.activated) return;
    this.entered = false;
  }

  private onDragStart(): void {
    this.activated = true;
  }

  private onDragEnd(event: PointerEvent): void {
    if (this.entered) this.drop.emit(event);

    this.activated = false;
    this.entered = false;
  }

}
