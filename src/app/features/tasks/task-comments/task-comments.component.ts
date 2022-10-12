import { Component, OnDestroy, OnInit } from '@angular/core';
import { TasksService } from "../tasks.service";
import { IComment, ITask } from "../../../shared/models/task.model";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-task-comments',
  templateUrl: './task-comments.component.html',
  styleUrls: ['./task-comments.component.scss']
})
export class TaskCommentsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  openedTask!: ITask;
  addCommentOpened = false;
  commentText!: string;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.subscription = this.tasksService.openedTaskComments.subscribe({
      next: (task) => this.openedTask = task
    });
  }

  closeForm() {
    this.commentText = '';
    this.addCommentOpened = false;
  }

  addNewComment() {
    if (!this.commentText) return;

    const newComment: IComment = {
      text: this.commentText,
      createdAt: new Date().toString()
    };

    if (this.openedTask.comments) {
      this.openedTask.comments.unshift(newComment);
    } else {
      this.openedTask.comments = [newComment];
    }

    this.tasksService.updateTask(this.openedTask);
    this.closeForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
