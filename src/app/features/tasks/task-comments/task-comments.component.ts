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
  isNewCommentValid = true;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.subscription = this.tasksService.openedTaskComments.subscribe({
      next: (task) => {
        if (!task.comments) {
          task.comments = [];
        }
        this.openedTask = task;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeForm() {
    this.commentText = '';
    this.isNewCommentValid = true;
    this.addCommentOpened = false;
  }

  addNewComment() {
    if (!this.commentText) {
      this.isNewCommentValid = false;
      return;
    }

    const newComment: IComment = {
      text: this.commentText,
      createdAt: new Date().toString()
    };

    this.openedTask.comments.unshift(newComment);
    this.tasksService.updateTask(this.openedTask);
    this.closeForm();
  }

  deleteComment(index: number) {
    this.openedTask.comments.splice(index, 1);
    this.tasksService.updateTask(this.openedTask);
  }

}
