// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DashboardComponent } from './dashboard.component';
// import { DashboardService } from "./dashboard.service";
// import { AuthService } from "../auth/auth.service";
// import { of, Subject } from "rxjs";

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;
//
//   const dashboardServiceMock = {
//     dashboardItems$: of(''),
//     initBoards() {}
//   };
//   const authServiceMock = {
//     currentPage: new Subject<string>()
//   };
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [DashboardComponent],
//       providers: [
//         { provide: DashboardService, useValue: dashboardServiceMock },
//         { provide: AuthService, useValue: authServiceMock }
//       ]
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
// });
