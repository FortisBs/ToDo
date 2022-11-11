import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModalComponent } from './task-modal.component';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TasksService } from "../tasks.service";
import { ActivatedRoute } from "@angular/router";

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;

  const tasksServiceMock = {
    createTask() {},
    updateTask() {}
  };
  const fakeActivatedRoute = {
    snapshot: {
      params: { 'id': 'boardId' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskModalComponent ],
      imports: [FormsModule, BrowserAnimationsModule],
      providers: [
        { provide: TasksService, useValue: tasksServiceMock },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('property boardId should equal id from route params id on ngOnInit', () => {
    component.ngOnInit();
    expect(component.boardId).toBe(fakeActivatedRoute.snapshot.params['id']);
  });

  it('should emit boolean on closeModal', () => {
    component.modalClosed.subscribe(next => {
      expect(next).toEqual(false);
    });
    component.closeModal();
  });

  it('should call tasksService.createTask on method addTask', () => {
    const spy = spyOn(tasksServiceMock, 'createTask');
    component.addTask({name: '', complexity: 1});
    expect(spy).toHaveBeenCalled();
  });

  it('should call tasksService.updateTask on method saveChanges', () => {
    const spy = spyOn(tasksServiceMock, 'updateTask');
    component.saveChanges({name: '', complexity: 1});
    expect(spy).toHaveBeenCalled();
  });
});
