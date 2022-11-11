import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListComponent } from './tasks-list.component';
import { ManageService } from "../../manage/manage.service";

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  const manageServiceMock = {
    getTaskListColor() { return 'green' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksListComponent],
      providers: [{ provide: ManageService, useValue: manageServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('property taskListColor should get value from ' +
    'manageService.getTaskListColor on ngOnInit', () => {
    component.ngOnInit();
    expect(component.taskListColor).toBe(manageServiceMock.getTaskListColor());
  });

  it('property isModalOpened should be true on call method openModal', () => {
    component.isModalOpened = false;
    component.openModal();
    expect(component.isModalOpened).toBeTrue();
  });
});
