import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBoard } from "../../shared/models/board.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  readonly dashboardItems$ = new Subject<IBoard[]>();
  private boards!: IBoard[];

  constructor(private http: HttpClient) {
    this.initBoards();
  }

  createBoard(data: {name: string, description: string}) {
    const newBoard: IBoard = {
      name: data.name,
      description: data.description,
      id: this.boards.length,
      createdAt: new Date()
    }
    this.boards.push(newBoard);

    this.addBoard();
  }

  private addBoard() {
    this.http
      .put<IBoard[]>('https://todo-565c1-default-rtdb.firebaseio.com/boards.json', this.boards)
      .subscribe((response) => {
        this.dashboardItems$.next(response);
      });
  }

  private initBoards() {
    this.http
      .get<IBoard[]>('https://todo-565c1-default-rtdb.firebaseio.com/boards.json')
      .subscribe((response) => {
        this.boards = response.slice();
        this.dashboardItems$.next(response);
      });
  }

  deleteBoard(id: number) {
    this.boards.splice(id, 1);

    this.http
      .put<IBoard[]>('https://todo-565c1-default-rtdb.firebaseio.com/boards.json', this.boards)
      .subscribe((response) => {
        this.dashboardItems$.next(response);
      });
  }
}
