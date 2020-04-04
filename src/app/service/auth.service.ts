import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>();
  constructor() {}

  isAuth(check) {
    this.authChange.next(check);
  }
}
