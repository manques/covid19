import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';

@Injectable({
  providedIn: 'root'
})

export class PopupService {
  constructor(private dialog: MatDialog) {}

  login() {
    this.dialog.open(LoginComponent);
  }
}
