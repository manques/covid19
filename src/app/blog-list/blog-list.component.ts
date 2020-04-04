import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})

export class BlogListComponent implements OnInit {
  blogs;
  spinner = true;
  constructor(private httpService: HttpService) {}
  ngOnInit() {
    this.httpService.getServer('/blog/lists').subscribe( result => {
      this.spinner = false;
      this.blogs = result;
      console.log(this.blogs);
    } );
  }
}
