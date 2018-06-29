import {Component, OnInit, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

import {Post} from "../post.model";
import {PostsService} from "../posts.service";
import {PageEvent} from "@angular/material";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  userAuthenticated = false;
  sub: Subscription;
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userId: string;

  constructor(public postsService: PostsService,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getLoggedInUserId();
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.postsService.getPosts(this.currentPage, this.postsPerPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
    this.sub = this.authService.getIsAuthenticatedListener()
      .subscribe((isAuthenicated: boolean)=>{
        this.userAuthenticated = isAuthenicated;
        this.userId = this.authService.getLoggedInUserId();

      })
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId)
      .subscribe(() => {
        this.postsService.getPosts(this.currentPage, this.postsPerPage);
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.currentPage, this.postsPerPage);

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.sub.unsubscribe();
  }


}
