import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  email = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe({
      next: (user) => {
        this.email = (user) ? user.email : ''
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
