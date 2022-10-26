import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "../../features/auth/auth.service";
import { Subscription } from "rxjs";
import { ManageService } from "../../features/manage/manage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  isAuthenticated = false;
  page!: string;
  email!: string;

  constructor(
    private authService: AuthService,
    private manageService: ManageService
  ) {}

  ngOnInit(): void {
    this.subs.add(this.authService.user.subscribe({
      next: (user) => {
        this.isAuthenticated = !!user;
        this.email = user?.email || '';
      }
    }));
    this.subs.add(this.authService.currentPage.subscribe({
      next: (value) => this.page = value
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  identifyUser() {
    const username = this.manageService.getUsername();
    return (username) ? username : this.email;
  }

}
