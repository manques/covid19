import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  spinner = false;
  data;
  hide = true;
  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required]
  });
  constructor(private fb: FormBuilder,
              private http: HttpService,
              private userService: UserService ) {}
  onSubmit() {
    this.spinner = true;
    console.log(this.signupForm.value);
    const formData = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      phone: this.signupForm.value.phone,
      password: this.signupForm.value.password,
      role: this.signupForm.value.role
    };
    this.http.postServer(`/user/signup`, formData).subscribe( result => {
      this.spinner = false;
      this.data = result;
      console.log(result);
    });
  }

  login() {
    this.signupForm.reset();
    this.userService.userOpen();
  }
  close() {
    this.data = undefined;
  }
}
