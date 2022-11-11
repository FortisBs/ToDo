import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardModalComponent } from './board-modal.component';
import { DashboardService } from "../dashboard.service";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('BoardModalComponent', () => {
  let component: BoardModalComponent;
  let fixture: ComponentFixture<BoardModalComponent>;

  const dashboardServiceMock = {
    createBoard() {},
    updateBoard() {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardModalComponent],
      imports: [FormsModule, BrowserAnimationsModule],
      providers: [{ provide: DashboardService, useValue: dashboardServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit boolean on closeModal', () => {
    component.modalClosed.subscribe(next => {
      expect(next).toEqual(false);
    });
    component.closeModal();
  });

  it('should call createBoard on method onAdd', () => {
    const spy = spyOn(dashboardServiceMock, 'createBoard');
    component.onAdd({name: '', description: ''});
    expect(spy).toHaveBeenCalled();
  });

  it('should call updateBoard on method onEdit', () => {
    const spy = spyOn(dashboardServiceMock, 'updateBoard');
    component.onEdit({name: ''});
    expect(spy).toHaveBeenCalled();
  });
});
