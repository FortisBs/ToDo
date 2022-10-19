import { Injectable } from '@angular/core';
import { User } from "../../shared/models/user.model";

interface LocalData {
  username?: string,
  taskListColor?: string
}

@Injectable({
  providedIn: 'root'
})
export class ManageService {
  private defaultTaskListColor = '#D9D9D9';

  getEmail() {
    const localUserData = localStorage.getItem('ToDoUser');
    if (!localUserData) return '';

    const { email } = JSON.parse(localUserData) as User;
    return email;
  }

  getUsername() {
    const localData = localStorage.getItem('ToDoData');
    if (!localData) return;

    const { username } = JSON.parse(localData) as LocalData;
    return username;
  }

  saveUsername(username: string) {
    const localData = localStorage.getItem('ToDoData');

    if (localData) {
      const data = JSON.parse(localData) as LocalData;
      data.username = username;
      localStorage.setItem('ToDoData', JSON.stringify(data));

    } else {
      localStorage.setItem('ToDoData', JSON.stringify({ username }));
    }
  }

  getTaskListColor() {
    const localData = localStorage.getItem('ToDoData');
    if (!localData) return this.defaultTaskListColor;

    const { taskListColor } = JSON.parse(localData) as LocalData;
    return taskListColor || this.defaultTaskListColor;
  }

  saveTaskListColor(taskListColor: string) {
    const localData = localStorage.getItem('ToDoData');

    if (localData) {
      const data = JSON.parse(localData) as LocalData;
      data.taskListColor = taskListColor;
      localStorage.setItem('ToDoData', JSON.stringify(data));

    } else {
      localStorage.setItem('ToDoData', JSON.stringify({ taskListColor }));
    }
  }
}
