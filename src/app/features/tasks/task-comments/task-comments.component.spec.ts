import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCommentsComponent } from './task-comments.component';
import { TasksService } from "../tasks.service";
import { of } from "rxjs";
import { Task } from "../../../shared/models/task.model";

describe('TaskCommentsComponent', () => {
  let component: TaskCommentsComponent;
  let fixture: ComponentFixture<TaskCommentsComponent>;

  const tasksServiceMock = {
    openedTaskComments: of(new Task('newTask', 1, 'To Do', '', '')),
    updateTask() {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCommentsComponent],
      providers: [{ provide: TasksService, useValue: tasksServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('property openedTask should receive a value from tasksService.openedTaskComments', () => {
    const sub = tasksServiceMock.openedTaskComments.subscribe({
      next: (task) => {
        expect(component.openedTask).toEqual(task);
      }
    });
    sub.unsubscribe();
  });

  it('should add empty array of comments if ' +
    'value from tasksService.openedTaskComments do not have it', () => {
    const sub = tasksServiceMock.openedTaskComments.subscribe({
      next: (task) => {
        expect(task.comments).toBeTruthy();
      }
    });
    sub.unsubscribe();
  });

  it('should change some properties value on method closeForm', () => {
    component.closeForm();
    expect(component.commentText).toBe('');
    expect(component.isNewCommentValid).toBeTrue();
    expect(component.addCommentOpened).toBeFalse();
  });

  it('on call method addNewComment if the property commentText is empty string ' +
    'then isNewCommentValid should equal false', () => {
    component.commentText = '';
    component.addNewComment();
    expect(component.isNewCommentValid).toBeFalse();
  });

  it('on call method addNewComment if the property commentText is not empty string ' +
    'then tasksService.updateTask should be called', () => {
    const spy = spyOn(tasksServiceMock, 'updateTask');
    component.commentText = 'Some comment';
    component.addNewComment();
    expect(spy).toHaveBeenCalled();
  });

  it('tasksService.updateTask should be called on method deleteComment', () => {
    const spy = spyOn(tasksServiceMock, 'updateTask');
    component.deleteComment(1);
    expect(spy).toHaveBeenCalled();
  });
});
