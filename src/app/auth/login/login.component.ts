import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../header/dialog/dialog.component';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  data;
  spinner = false;
  hide = true;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private router: Router,
              private dialogRef: MatDialogRef<DialogComponent>,
              private authService: AuthService) {}
  onSubmit() {
    this.spinner = true;
    console.log(this.loginForm.value);
    this.httpService.postServer('/user/login', {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe( result => {
      this.spinner = false;
      console.log(result);
      if (!result['success']) {
         this.data = result;
      } else {
        window.localStorage.setItem('token', result['token']);
        this.dialogRef.close();
        console.log(this.router.url);
        this.router.navigate([this.router.url]);
        this.authService.isAuth(true);
      }
    });
  }

  back() {
    console.log('back');
    this.data = undefined;
  }
}
