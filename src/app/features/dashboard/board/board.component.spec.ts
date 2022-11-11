import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { DashboardService } from "../dashboard.service";
import { Router } from "@angular/router";

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let router: Router;
  const boardId = 'board id';

  const dashboardServiceMock = {
    deleteBoard(id: string) {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceMock }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    component.board = { id: boardId, name: '', description: '', createdAt: '' };
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open options',  () => {
    component.optionsOpened = false;
    component.toggleOptions(new MouseEvent('click'));
    expect(component.optionsOpened).toBeTrue();
  });

  it('should open edit modal window',  () => {
    component.openEdit(new MouseEvent('click'));
    expect(component.editOpened).toBeTrue();
  });

  it('should call "deleteBoard" with board id', function () {
    const spy = spyOn(dashboardServiceMock, 'deleteBoard');
    component.delete(new MouseEvent('click'));
    expect(spy).toHaveBeenCalledWith(boardId);
  });

  it('should not call "deleteBoard" without board id', function () {
    const spy = spyOn(dashboardServiceMock, 'deleteBoard');
    component.board.id = undefined;
    component.delete(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalledWith(boardId);
  });

  it('should go to dashboard on OpenBoard', () => {
    component.openBoard();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard/' + component.board.id]);
  });
});
