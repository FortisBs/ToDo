import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { Subject } from "rxjs";
import { TasksService } from "../tasks.service";

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  const tasksServiceMock = {
    deleteTask() {},
    moveTaskToAnotherStatus() {},
    openedTaskComments: new Subject()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle options', () => {
    component.optionsOpened = false;
    component.toggleOptions(new MouseEvent('click'));
    expect(component.optionsOpened).toBeTrue();
    component.toggleOptions(new MouseEvent('click'));
    expect(component.optionsOpened).toBeFalse();
  });

  it('property editOpened should turn to true on openEdit', () => {
    component.editOpened = false;
    component.openEdit(new MouseEvent('click'));
    expect(component.editOpened).toBeTrue();
  });

  it('should call tasksService.deleteTask on method delete', () => {
    const spy = spyOn(tasksServiceMock, 'deleteTask');
    component.delete(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call tasksService.moveTaskToAnotherStatus on method moveToArchive', () => {
    const spy = spyOn(tasksServiceMock, 'moveTaskToAnotherStatus');
    component.moveToArchive(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should call tasksServiceMock.openedTaskComments.next on method openComments', () => {
    const spy = spyOn(tasksServiceMock.openedTaskComments, 'next');
    component.openComments();
    expect(spy).toHaveBeenCalled();
  });
});
