import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/Operators';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  spinner = true ;
  blog;
  selectedId;
  hours;
  constructor( private routes: ActivatedRoute, private httpService: HttpService ) { }

  ngOnInit() {
  //  this.blog =  this.routes.paramMap.pipe( switchMap( params => {
  //     this.selectedId = params.get('id');
  //     console.log(this.selectedId);
  //     return this.httpService.getServer(`/blog/blog-list/${this.selectedId}`);
  //   } ) );
  //   console.log('fsadfsdfsdfsdffd');
  //  console.log(this.blog);

    // console.log(this.routes);
    // this. selectedId = this.routes.snapshot.paramMap.get('id');
    // console.log(this. selectedId);
    // this.blog = this.httpService.getServer(`/blog/blog-list/${this.selectedId}`);
    // console.log(this.blog);

    console.log(this.routes);
    this. selectedId = this.routes.snapshot.paramMap.get('id');
    console.log(this. selectedId);
    this.httpService.getServer(`/blog/blog-list/${this.selectedId}`).subscribe( result => {
      this.spinner = false;
      console.log(result);
      this.blog = result;
      const d1 = new Date(this.blog.created).getTime();
      const d2 = new Date().getTime();
      this.hours = new Date(d2 - d1).getHours();
    });

  }

}
