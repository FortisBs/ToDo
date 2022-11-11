import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListStyleComponent } from './task-list-style.component';
import { ManageService } from "../../manage.service";

describe('TaskListStyleComponent', () => {
  let component: TaskListStyleComponent;
  let fixture: ComponentFixture<TaskListStyleComponent>;

  const manageServiceMock = {
    getTaskListColor() { return 'green' },
    saveTaskListColor(color: string) {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListStyleComponent],
      providers: [{ provide: ManageService, useValue: manageServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('property currentColor should receive color ' +
    'from manageService.getTaskListColor', () => {
    component.ngOnInit();
    expect(component.currentColor).toBe(manageServiceMock.getTaskListColor());
  });

  it('should call manageService.saveTaskListColor ' +
    'with specified color on method onSelectColor', () => {
    const spy = spyOn(manageServiceMock, 'saveTaskListColor');
    const color = 'white';
    component.onSelectColor(color);
    expect(spy).toHaveBeenCalledWith(color);
  });
});
