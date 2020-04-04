import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  baseUrl = 'http://13.233.139.184:8000';
  httpOptions = { headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })};
  constructor(private http: HttpClient) {}
  // post server
  postServer(url, data) {
    console.log(`${this.baseUrl}${url}`);
    console.log(data);
    console.log(this.httpOptions);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', window.localStorage.getItem('token') || '');
    return this.http.post(`${this.baseUrl}${url}`, data, this.httpOptions);
  }
  // post file to the server
  postServerFile(url, data) {
    return this.http.post(`${this.baseUrl}${url}`, data);
  }

  // get request from server
  getServer(url) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', window.localStorage.getItem('token') || '');
    return this.http.get(`${this.baseUrl}${url}`, this.httpOptions);
  }

  // update server
  updateServer(url, data) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', window.localStorage.getItem('token') || '');
    return this.http.put(`${this.baseUrl}${url}`, data, this.httpOptions);
  }
}
