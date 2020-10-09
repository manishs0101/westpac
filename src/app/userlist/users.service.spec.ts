import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { expectedCommentListMock, expectedPostListMock, expectedUserListMock } from '../mock/users';

describe('UsersService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let usersService: UsersService;
  const expectedUserList = expectedUserListMock;
  const expectedPostList = expectedPostListMock;
  const expectedCommentList = expectedCommentListMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test
      providers: [UsersService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    usersService = TestBed.inject(UsersService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
  });

  it('should return expected users', () => {
    usersService.getAllUsers().subscribe(
      data => expect(data).toEqual(expectedUserList, 'should return expected data'),
      fail
    );

    // HeroService should have made one request to GET data from expected URL
    const req = httpTestingController.expectOne(`${usersService.baseUrl}/users`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock data
    req.flush(expectedUserList);
  });

  it('should return expected post', () => {
    usersService.getPost(1).subscribe(
      postdata => expect(postdata).toEqual(expectedPostList, 'should return expected data'),
      fail
    );

    // HeroService should have made one request to GET data from expected URL
    const req = httpTestingController.expectOne(`${usersService.baseUrl}/posts?userId=1`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock data
    req.flush(expectedPostList);
  });

  it('should return expected comments', () => {
    usersService.getComment(1).subscribe(
      commentdata => expect(commentdata).toEqual(expectedCommentList, 'should return expected data'),
      fail
    );

    // HeroService should have made one request to GET data from expected URL
    const req = httpTestingController.expectOne(`${usersService.baseUrl}/comments?postId=1`);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock data
    req.flush(expectedCommentList);
  });
});
