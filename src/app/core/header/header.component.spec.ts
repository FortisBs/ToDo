import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from "../../features/auth/auth.service";
import { ManageService } from "../../features/manage/manage.service";
import { of } from "rxjs";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authServiceMock = {
    user: of({}),
    currentPage: of(''),
    logout() {}
  };
  const manageServiceMock = {
    getUsername() { return '' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: ManageService, useValue: manageServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to current page and save it', () => {
    authServiceMock.currentPage = of('dashboard');
    component.ngOnInit();
    authServiceMock.currentPage.subscribe({
      next: (currentPage) => {
        expect(component.page).toBe(currentPage);
      }
    });
  });

  it('should subscribe to user and check whether user is authenticated', () => {
    authServiceMock.user = of({ username: 'Some name' });
    component.ngOnInit();
    authServiceMock.user.subscribe({
      next: () => {
        expect(component.isAuthenticated).toBeTrue();
      }
    });
  });

  it('should call logout', () => {
    const spy = spyOn(authServiceMock, 'logout');
    component.onLogout();
    expect(spy).toHaveBeenCalled();
  });

  it('should return username if exists', () => {
    spyOn(manageServiceMock, 'getUsername').and.returnValue('user name');
    const username = component.identifyUser();
    expect(username).toBe('user name');
  });
});
