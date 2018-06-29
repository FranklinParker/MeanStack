import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthData} from "./auth-data.model";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";


const  BACKEND_URL = environment.apiUrl + 'user'
@Injectable({
  providedIn: "root"
})
export class AuthService {
  token: string;
  isAuth = false;
  private tokenTimer;
  isAuthenticated: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getLoggedInUserId(): string{
    return localStorage.getItem('userId');
  }
  async createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    try {
      const user = await this.http.post(BACKEND_URL + '/signup',
        authData).toPromise();
      return { success: true};
    } catch (e) {
      return { success: false, message: 'Could not create error'};
    }

  }

  async login(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    try {
      const resp = await this.http.post<{
        message?: string,
        token?: string,
        expiresIn?: number,
        userId?: string
      }>(BACKEND_URL + '/login',
        authData).toPromise();
      if (resp.token) {
        this.token = resp.token;
        this.setAuthTimer(resp.expiresIn);
        localStorage.setItem('userId', resp.userId);
        const expirationDate = new Date(Date.now()
          + (resp.expiresIn * 1000));
        this.setToken(this.token, expirationDate);
        this.isAuthenticated.next(true);
        this.isAuth = true;
        this.router.navigate(["/"]);
        return { success: true};


      } else {
        return { success: false};

      }
    } catch (e) {
      return { success: false};

    }

  }

  autoAuthUser() {
    const authData = this.getAuthData();
    if (!authData.tokenExists) {
      return;
    }
    const expiresTime = authData.expirationDate.getTime() - new Date().getTime();
    if(expiresTime > 0){
      this.token = authData.token;
      this.isAuth = true;
      this.isAuthenticated.next(true);
      this.setAuthTimer(expiresTime/1000);
      this.router.navigate(["/"]);

    }else{
      this.clearAuthData();

    }


  }


  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      console.log("automatic timeout ");
      this.logout();
    }, duration * 1000);
  }
  getIsAuthenticatedListener(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getToken(): string {
    return this.token;
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.isAuthenticated.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/auth/login"]);

  }

  getIsAuthenticated(): boolean {
    return this.isAuth;
  }

  private setToken(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }

  private getAuthData(): { token?: string, expirationDate?: Date, tokenExists: boolean } {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");
    if (!token || !expiration) {
      return {tokenExists: false};
    }
    return {
      token: token,
      expirationDate: new Date(expiration),
      tokenExists: true
    };


  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem('userId');
  }

}
