import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './model/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/users');
  }

  getPost(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/posts?userId='+userId);
  }

  getComment(postId: number): Observable<any> {
    return this.http.get(this.baseUrl + '/comments?postId='+postId);
  }
}
