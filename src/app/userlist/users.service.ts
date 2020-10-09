import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getPost(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts?userId=${userId}`);
  }

  getComment(postId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/comments?postId=${postId}`);
  }
}
