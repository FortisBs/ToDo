import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBoard } from "../../shared/models/board.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  createBoard(newBoard: IBoard[]) {
    this.http
      .put<IBoard[]>('https://todo-565c1-default-rtdb.firebaseio.com/boards.json', newBoard)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getAllBoards() {
    return this.http.get<IBoard[]>('https://todo-565c1-default-rtdb.firebaseio.com/boards.json');
  }
}
