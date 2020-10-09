import { Component, OnInit } from '@angular/core';
import { User } from '../model/users';
import { UsersService } from './users.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userList: User[];
  postList: any[];
  allPost: any[];
  commentList: any;
  loading: boolean;
  selectedUser: string;
  selectedPost: number;
  errorMessage: string;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userList = [];
    this.usersService.getAllUsers().subscribe((data: User[]) => {
      if (data) {
        this.userList = data;
      }
      this.loading = false;
    });
  }

  getPosts(userId: number, name: string) {
    this.loading = true;
    this.postList = [];
    this.selectedUser = name;
    this.usersService.getPost(userId).subscribe((data: []) => {
      if (data) {
        this.allPost = data;
        this.postList = data.slice(0, 3);
      }
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }

  loadAll() {
    this.loading = true;
    this.postList = this.allPost;
    this.loading = false;

  }

  getComments(postId: number) {
    this.loading = true;
    this.selectedPost = postId;
    this.commentList = [];
    this.usersService.getComment(postId).subscribe((data: []) => {
      if (data) {
        this.commentList = data;
      }
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    });
  }

}
