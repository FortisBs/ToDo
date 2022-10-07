import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../features/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs!: Subscription;
  isAuthenticated = false;
  page!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subs = this.authService.user.subscribe({
      next: (user) => this.isAuthenticated = !!user
    });
    this.subs.add(this.authService.currentPage.subscribe({
      next: (value) => this.page = value
    }));
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
