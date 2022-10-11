import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { ITask } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  droppableItem!: ITask;
  dragStart$: Observable<PointerEvent>;
  dragMove$: Observable<PointerEvent>;
  dragEnd$: Observable<PointerEvent>;

  private dragStartSubject = new Subject<PointerEvent>();
  private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();

  constructor() {
    this.dragStart$ = this.dragStartSubject.asObservable();
    this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
  }

  onDragStart(event: PointerEvent): void {
    this.dragStartSubject.next(event);
  }

  onDragMove(event: PointerEvent): void {
    this.dragMoveSubject.next(event);
  }

  onDragEnd(event: PointerEvent): void {
    this.dragEndSubject.next(event);
  }
}
