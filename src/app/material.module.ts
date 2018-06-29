import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatExpansionModule,
  MatInputModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ],

  declarations: []
})
export class MaterialModule { }
