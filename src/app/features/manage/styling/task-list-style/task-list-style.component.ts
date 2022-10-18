import { Component, OnInit } from '@angular/core';
import { ManageService } from "../../manage.service";

@Component({
  selector: 'app-task-list-style',
  templateUrl: './task-list-style.component.html',
  styleUrls: ['./task-list-style.component.scss']
})
export class TaskListStyleComponent implements OnInit {
  colors = ['#D9D9D9', 'darkslategray', 'darkgreen', 'darkblue', 'darkmagenta', 'darkkhaki',
    'linear-gradient(#020024 0%, #090979 35%, #00d4ff 100%)',
    'linear-gradient(#833ab4 0%, #fd1d1d 75%, #fcb045 100%)',
    'linear-gradient(#fdbb2d 0%, #22c1c3 100%)'
  ];
  currentColor!: string;
  exampleTasks = ['Task 1', 'Task 2', 'Task 3'];

  constructor(private manageService: ManageService) {}

  ngOnInit(): void {
    this.currentColor = this.manageService.getTaskListColor();
  }

  onSelectColor(color: string) {
    this.currentColor = color;
    this.manageService.saveTaskListColor(color);
  }
}
