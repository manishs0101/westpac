import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { expectedCommentListMock, expectedPostListMock, expectedUserListMock } from '../mock/users';
import { UserlistComponent } from './userlist.component';
import { UsersService } from './users.service';

describe('UserlistComponent', () => {
    let component: UserlistComponent;
    let fixture: ComponentFixture<UserlistComponent>;
    let usersService: UsersService;
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [UserlistComponent],
            providers: [UsersService]
        })
            .compileComponents();
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        usersService = TestBed.inject(UsersService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserlistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should call getAllUsers and return list of users", waitForAsync(() => {
        spyOn(usersService, 'getAllUsers').and.returnValues(of(expectedUserListMock));
        component.ngOnInit();

        fixture.detectChanges();

        expect(component.userList).toEqual(expectedUserListMock);
    }));


    it("should call getPosts", waitForAsync(() => {
        spyOn(usersService, 'getPost').and.returnValues(of(expectedPostListMock));
        component.getPosts(1, 'username');

        fixture.detectChanges();

        expect(component.postList).toEqual(expectedPostListMock);
    }));


    it("should call getComments", waitForAsync(() => {
        spyOn(usersService, 'getComment').and.returnValues(of(expectedCommentListMock));
        component.getComments(1);

        fixture.detectChanges();

        expect(component.commentList).toEqual(expectedCommentListMock);
    }));
});
