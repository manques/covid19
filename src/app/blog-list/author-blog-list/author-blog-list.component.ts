import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { PopupService } from '../../service/popup.service';

@Component({
  selector: 'app-author-blog-list',
  templateUrl: './author-blog-list.component.html',
  styleUrls: ['./author-blog-list.component.css']
})

export class AuthorBlogListComponent implements OnInit {
  blogs;
  spinner = true;
  constructor(private httpService: HttpService,
              private popupService: PopupService) {}
  ngOnInit() {
    this.getAuthorBlogList();
  }
  getAuthorBlogList() {
    this.httpService.getServer('/blog/author-blog-list').subscribe( result => {
      console.log(result);
      this.spinner = false ;
      if (!result['success'] && (result['message']?.name === 'TokenExpiredError')) {
        this.popupService.login();
      } else {
        this.blogs = result['data'];
        console.log(this.blogs);
      }
    });
  }
}
