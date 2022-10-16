import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentPage.next('manage');
  }

}
