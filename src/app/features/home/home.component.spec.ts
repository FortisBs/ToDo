import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Subject } from "rxjs";
import { AuthService } from "../auth/auth.service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const authServiceMock = {
    currentPage: new Subject<string>()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass current page on component init', () => {
    const spy = spyOn(authServiceMock.currentPage, 'next');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('home');
  });
});
