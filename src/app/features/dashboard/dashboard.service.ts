import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBoard } from "../../shared/models/board.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly dashboardItems$ = new Subject<IBoard[]>();
  private boards: IBoard[] = [];

  constructor(private http: HttpClient) {
    this.initBoards();
  }

  createBoard(newBoard: IBoard) {
    this.http
      .post<{name: string}>('https://todo-565c1-default-rtdb.firebaseio.com/boards.json', newBoard)
      .subscribe((generatedId) => {
        newBoard.id = generatedId.name;
        this.boards.push(newBoard);
        this.dashboardItems$.next(this.boards);
        this.addId(newBoard);
      });
  }

  private addId(board: IBoard) {
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/boards/${board.id}.json`, board)
      .subscribe();
  }

  private initBoards() {
    this.http
      .get('https://todo-565c1-default-rtdb.firebaseio.com/boards.json')
      .subscribe((response) => {
        this.boards = Object.values(response) as IBoard[];
        this.dashboardItems$.next(this.boards);
      });
  }

  updateBoard(board: IBoard, newName: string) {
    const updatedBoard = { ...board, name: newName };
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/boards/${board.id}.json`, updatedBoard)
      .subscribe(() => {
        const index = this.boards.findIndex((board) => board.id === updatedBoard.id);
        this.boards[index] = updatedBoard;
        this.dashboardItems$.next(this.boards);
      });
  }

  deleteBoard(id: string) {
    this.http
      .delete(`https://todo-565c1-default-rtdb.firebaseio.com/boards/${id}.json`)
      .subscribe(() => {
        const index = this.boards.findIndex((board) => board.id === id);
        this.boards.splice(index, 1);
        this.dashboardItems$.next(this.boards);
      });
  }
}
