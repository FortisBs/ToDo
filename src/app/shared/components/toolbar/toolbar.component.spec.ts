import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { ActivatedRoute } from "@angular/router";
import { ToolbarService } from "./toolbar.service";
import { DashboardService } from "../../../features/dashboard/dashboard.service";
import { of } from "rxjs";

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  const toolbarServiceMock = {
    passData() {}
  };
  const dashboardServiceMock = {
    getBoard() { return of({ name: 'boardName' }) }
  };
  const fakeActivatedRoute = {
    snapshot: {
      params: { 'id': 'boardId' }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        { provide: ToolbarService, useValue: toolbarServiceMock },
        { provide: DashboardService, useValue: dashboardServiceMock },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('toolbarService.passData should be called on ' +
    'call of private method captureChanges', () => {
    const spy = spyOn(toolbarServiceMock, 'passData');
    component.changeSortValue();
    expect(spy).toHaveBeenCalled();
  });

  it('property data.searchValue should receive value ' +
    'from argument of method changeSearchValue ', () => {
    const argumentValue = 'some value';
    component.changeSearchValue(argumentValue);
    expect(component.data.searchValue).toBe(argumentValue);
  });

  it('property data.ascDirection should toggle on method changeSortDirection', () => {
    component.data.ascDirection = false;
    component.changeSortDirection();
    expect(component.data.ascDirection).toBeTrue();
    component.changeSortDirection();
    expect(component.data.ascDirection).toBeFalse();
  });
});
