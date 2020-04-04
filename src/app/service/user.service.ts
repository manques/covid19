import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 userChange = new Subject();
  constructor() {}
  userOpen() {
    this.userChange.next(true);
  }
}
