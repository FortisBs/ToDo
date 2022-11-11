import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { FormControl } from "@angular/forms";
import { of, Subject } from "rxjs";

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let router: Router;

  const authServiceMock = {
    currentPage: new Subject<string>(),
    login() { return of('') },
    signUp() { return of('') }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch login mode', () => {
    component.isLoginMode = true;
    component.switchMode();
    expect(component.isLoginMode).toBeFalse();
  });

  it('should return error object on password with not allowed word', () => {
    const validationResult = component.passwordValidation(new FormControl('iamadmin'));
    expect(validationResult).toEqual({wrongPassword: true});
  });

  it('should return "null" on correct password', () => {
    const validationResult = component.passwordValidation(new FormControl('correctPass123'));
    expect(validationResult).toBe(null);
  });

  it('should go to dashboard after form submit', () => {
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
