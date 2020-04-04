import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { PopupService } from '../../service/popup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})

export class AddBlogComponent {
  spinner = false ;
  url;
  selectedImage;
  imageTitle = 'Upload Image';
  categories = ['politics', 'economy', 'health', 'film', 'international'];
  blogForm = this.fb.group({
    title: ['', Validators.required],
    subTitle: ['', Validators.required],
    category: ['', Validators.required],
    image: ['', Validators.required],
    paragraph: ['', Validators.required]
  });
  constructor( private fb: FormBuilder,
               private httpService: HttpService,
               private popupService: PopupService,
               private router: Router ) {}
  // submit form
  onSubmit() {
    this.spinner = true;
    console.log(this.blogForm);
    const formData = new FormData();
    formData.append('token', window.localStorage.getItem('token'));
    formData.append('image', this.selectedImage, this.selectedImage.title);
    formData.append('title', this.blogForm.value.title);
    formData.append('subTitle', this.blogForm.value.subTitle);
    formData.append('category', this.blogForm.value.category);
    formData.append('paragraph', this.blogForm.value.paragraph);
    this.httpService.postServerFile('/blog/add-post', formData).subscribe(result => {
      this.spinner = false;
      console.log(result);
      if (!result['success'] && ( result['message']?.name === 'TokenExpiredError') ) {
        console.log('login');
        this.popupService.login();
      } else {
        this.spinner = false;
        console.log(result);
        this.router.navigate(['/author-blog-list']);
      }
    });
  }

  // change
  onChange(event) {
    this.imageTitle = 'Change Image';
    console.log(event);
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = (eve) => {
      this.url = eve.target.result;
      console.log(this.url);
      this.blogForm.patchValue({
        image: this.url
      });
      console.log(this.blogForm.value);
    };
  }
}
