import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListStyleComponent } from './task-list-style.component';

describe('TaskListStyleComponent', () => {
  let component: TaskListStyleComponent;
  let fixture: ComponentFixture<TaskListStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskListStyleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
