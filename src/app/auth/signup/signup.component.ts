import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  async onSignUp(form: NgForm){
   if(form.invalid){
     return;
   }
   this.isLoading = true;
   const result = await this.authService.createUser(form.value.email, form.value.password);
   console.log("result create", result);
   this.isLoading = false;

  }

}
