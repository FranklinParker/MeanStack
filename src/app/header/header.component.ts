import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  sub: Subscription;
  userAuthenticated = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuthenticated();
    this.sub = this.authService.getIsAuthenticatedListener()
      .subscribe((isAuthenticated: boolean) => {
        console.log('header got isAuthEvent', isAuthenticated);
        this.userAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }
}
