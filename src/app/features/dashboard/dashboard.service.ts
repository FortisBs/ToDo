import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBoard } from "../../shared/models/board.model";
import { Subject } from "rxjs";
import { LocalStorageUser } from "../../shared/models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly dashboardItems$ = new Subject<IBoard[]>();
  private boards: IBoard[] = [];

  constructor(private http: HttpClient) {}

  createBoard(newBoard: IBoard) {
    this.http
      .post<{name: string}>('https://todo-565c1-default-rtdb.firebaseio.com/boards.json', newBoard)
      .subscribe((generatedId) => {
        const userId = this.getUserId();
        if (!userId) return;

        newBoard.uid = userId;
        newBoard.id = generatedId.name;

        this.boards.push(newBoard);
        this.dashboardItems$.next(this.boards.slice());
        this.addId(newBoard);
      });
  }

  private addId(board: IBoard) {
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/boards/${board.id}.json`, board)
      .subscribe();
  }

  initBoards() {
    const userId = this.getUserId();
    this.http
      .get(`https://todo-565c1-default-rtdb.firebaseio.com/boards.json?orderBy="uid"&equalTo="${userId}"`)
      .subscribe((response) => {
        this.boards = Object.values(response) as IBoard[];
        this.dashboardItems$.next(this.boards);
      });
  }

  getBoard(id: string) {
    return this.http.get<IBoard>(`https://todo-565c1-default-rtdb.firebaseio.com/boards/${id}.json`);
  }

  updateBoard(board: IBoard, newName: string) {
    const updatedBoard = { ...board, name: newName };
    this.http
      .patch(`https://todo-565c1-default-rtdb.firebaseio.com/boards/${board.id}.json`, updatedBoard)
      .subscribe(() => {
        const index = this.boards.findIndex((board) => board.id === updatedBoard.id);
        this.boards[index] = updatedBoard;
        this.dashboardItems$.next(this.boards.slice());
      });
  }

  deleteBoard(id: string) {
    this.http
      .delete(`https://todo-565c1-default-rtdb.firebaseio.com/boards/${id}.json`)
      .subscribe(() => {
        const index = this.boards.findIndex((board) => board.id === id);
        this.boards.splice(index, 1);
        this.dashboardItems$.next(this.boards.slice());
      });
  }

  private getUserId() {
    const userData = localStorage.getItem('ToDoUser');
    if (!userData) return;

    const { id } = JSON.parse(userData) as LocalStorageUser;
    return id;
  }

}
