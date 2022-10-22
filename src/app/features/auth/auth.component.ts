import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { AuthResponseData } from "../../shared/models/auth.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.passwordValidation])
  });
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentPage.next('auth');
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  passwordValidation(control: FormControl) {
    const value: string = control.value;
    if (value.length < 6 || value.includes('admin')) {
      return { 'wrongPassword': true };
    }
    return null;
  }

  onSubmit() {
    const email = this.authForm.value.email as string;
    const password = this.authForm.value.password as string;

    const authObs: Observable<AuthResponseData> = (this.isLoginMode)
      ? this.authService.login(email, password)
      : this.authService.signUp(email, password);

    authObs.subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.errorMessage = err
    });
  }
}
