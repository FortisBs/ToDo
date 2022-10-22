import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ManageService } from "../../manage.service";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalInfoComponent implements OnInit {
  email!: string;
  username!: string;

  constructor(private manageService: ManageService) {}

  ngOnInit(): void {
    this.email = this.manageService.getEmail();
    this.username = this.manageService.getUsername() || '';
  }

  onSaveUsername() {
    this.manageService.saveUsername(this.username.trim());
  }
}
