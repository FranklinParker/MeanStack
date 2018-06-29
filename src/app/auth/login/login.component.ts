import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  async onLogin(loginForm: NgForm){
    this.isLoading = true;
    const result = await this.authService.login(loginForm.value.email, loginForm.value.password);
    this.isLoading = false;
    console.log('login result', result);
  }
}
