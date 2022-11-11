import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { ActivatedRoute } from "@angular/router";
import { TasksService } from "./tasks.service";
import { ToolbarService } from "../../shared/components/toolbar/toolbar.service";
import { of, Subject } from "rxjs";
import { ITask, Task, TaskStatus } from "../../shared/models/task.model";

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  let taskInProgress: ITask[];
  let taskArchived: ITask[];
  let map: Map<TaskStatus, ITask[]>;

  const tasksServiceMock = {
    tasksGroupedByStatus$: new Subject<Map<TaskStatus, ITask[]>>(),
    initTasks() {}
  };
  const toolbarServiceMock = {
    getData() { return of('data') }
  };
  const fakeActivatedRoute = {
    snapshot: {
      params: { 'id': 'taskId' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      providers: [
        { provide: TasksService, useValue: tasksServiceMock },
        { provide: ToolbarService, useValue: toolbarServiceMock },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    map = new Map<TaskStatus, ITask[]>();
    taskInProgress = [new Task('first', 1, 'In Progress', '', '', [])];
    taskArchived = [new Task('two', 3, 'Archived', '', '', [])];
    map.set('In Progress', taskInProgress);
    map.set('Archived', taskArchived);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should split tasks on tasksGroupedByStatus$.subscribe', () => {
    const sub = tasksServiceMock.tasksGroupedByStatus$.subscribe({
      next: () => {
        expect(component.activeTasks.has('In Progress')).toBeTrue();
        expect(component.archivedTasks?.has('Archived')).toBeTrue();
      }
    });
    tasksServiceMock.tasksGroupedByStatus$.next(map);
    sub.unsubscribe();
  });

  it('property archivedTasks should be null when initial map ' +
    'does not include tasks with the status Archived', () => {
    map.set('Archived', []);
    const sub = tasksServiceMock.tasksGroupedByStatus$.subscribe({
      next: () => {
        expect(component.archivedTasks).toEqual(null);
      }
    });
    tasksServiceMock.tasksGroupedByStatus$.next(map);
    sub.unsubscribe();
  });

  it('should call the function initTasks', () => {
    const spy = spyOn(tasksServiceMock, 'initTasks');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should receive toolbar data on getData().subscribe', () => {
    toolbarServiceMock.getData().subscribe({
      next: (value) => {
        expect(value).toBe('data');
      }
    })
  });

  it('should call function disableSort and return 0', () => {
    const returnedValue = component.disableSort();
    expect(returnedValue).toBe(0);
  });
});
