import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { PopupService } from '../../service/popup.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user;
  spinner = true;
  selectedFile;
  url;
  role = 'normal';
  constructor(private httpService: HttpService,
              private popupService: PopupService,
              private router: Router,
               ) {}
  ngOnInit() {
    this.getProfile();
  }

  onChange(event) {
    this.spinner = true;
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];

    this.onUpload();
  }
  onUpload() {
    const formData = new FormData();
    formData.append('profile-image', this.selectedFile, this.selectedFile.name);
    formData.append('token', window.localStorage.getItem('token'));
    this.httpService.postServerFile('/user/profile-image', formData).subscribe( result => {
      this.spinner = false;
      if (!result['success']) {
        console.log(result['message']);
        this.popupService.login();
      } else {
        console.log(result);
        this.url = result['data'].url;
      }
    });
  }

  // get profile
  getProfile() {
    this.httpService.getServer('/user/profile').subscribe( result => {
      this.spinner = false;
      console.log(result);
      if (!result['success']) {
        this.popupService.login();
        this.router.navigate(['/profile']);
        this.user = result['data'];
      } else {
        this.user = result['data'];
        this.url = result['data'].image;
        this.role = result['data']?.role || 'normal';
      }
    });
  }
  // change role
  changeSelect(event) {
    console.log(event.value);
    this.httpService.updateServer('/user/role', { role: event.value }).subscribe( result => {
      console.log(result);
    });
  }
}
