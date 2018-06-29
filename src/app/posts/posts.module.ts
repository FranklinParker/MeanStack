import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostListComponent} from "./post-list/post-list.component";
import {PostCreateComponent} from "./post-create/post-create.component";
import {MaterialModule} from "../material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    PostListComponent,
    PostCreateComponent
  ],

})
export class PostsModule { }
