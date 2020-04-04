import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../header/dialog/dialog.component';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  auth;
  open = false;
  dRef;
  dialogData = {
    width: '400px',
    data: { login: 'login', signup: 'signup' }
  };

  @Output() sidenavToggler = new EventEmitter();
  constructor(private dialog: MatDialog,
              private userService: UserService,
              private authService: AuthService) {}
  openDialog() {
    // open dialog
   const dialogRef = this.dialog.open(DialogComponent);
   // after close dialog
   this.dRef = dialogRef;
   dialogRef.afterClosed().subscribe( result => {
     console.log(result);
   });
  }

  ngOnInit() {
    this.userService.userChange.subscribe( data => {
      if (data) {
        this.dRef.close();
        this.openDialog();
      }
    });
    this.authService.authChange.subscribe( ch => {
      console.log(this.auth);
      this.auth = ch;
    });
    if (window.localStorage.getItem('token')) {
      this.authService.isAuth(true);
    }
  }

  logout() {
    window.localStorage.removeItem('token');
    this.authService.isAuth(false);
  }
}
