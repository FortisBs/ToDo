import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ToolbarData } from "../models/toolbar.model";

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private toolbarData = new Subject<ToolbarData>();

  passData(data: ToolbarData) {
    this.toolbarData.next(data);
  }

  getData() {
    return this.toolbarData;
  }
}
