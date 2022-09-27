import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBoard } from "../../shared/models/board.model";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  activeBoard!: IBoard;

  constructor(private http: HttpClient) {}

  getTasks(id: string) {

  }
}
