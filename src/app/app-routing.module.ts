import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { BlogComponent } from './blog-list/blog/blog.component';
import { AddBlogComponent } from './blog-list/add-blog/add-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AuthorBlogListComponent } from './blog-list/author-blog-list/author-blog-list.component';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: 'add-blog', component: AddBlogComponent },
  { path: 'blog-list', component: BlogListComponent },
  { path: 'author-blog-list', component: AuthorBlogListComponent },
  { path: 'chart', component: ChartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  constructor() {}
}
