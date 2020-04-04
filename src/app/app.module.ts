import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// add reactive form module
import { ReactiveFormsModule } from '@angular/forms';
// http module for connect with server
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// import module
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';


// import component
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './header/sidenav/sidenav.component';
import { SliderComponent } from './home/slider/slider.component';
import { DialogComponent } from './header/dialog/dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { NecessityComponent } from './page/necessity/necessity.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { AddBlogComponent } from './blog-list/add-blog/add-blog.component';
import { BlogComponent } from './blog-list/blog/blog.component';
import { AuthorBlogListComponent } from './blog-list/author-blog-list/author-blog-list.component';
import { ChartComponent } from '../app/chart/chart.component';
import { LineChartComponent } from '../app/chart/line-chart/line-chart.component';
import { ChartLineComponent } from './chart/chart-line/chart-line.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    SliderComponent,
    DialogComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    NecessityComponent,
    ProfileComponent,
    BlogListComponent,
    BlogComponent,
    AddBlogComponent,
    AuthorBlogListComponent,
    ChartComponent,
    LineChartComponent,
    ChartLineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppMaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
