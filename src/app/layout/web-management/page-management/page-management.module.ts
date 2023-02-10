import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageManagementRoutingModule } from './page-management-routing.module';
import { PageManagementComponent } from './page-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material/material.module';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    PageManagementComponent
  ],
  imports: [
    CommonModule,
    PageManagementRoutingModule,
    MatFormFieldModule,
    MatInputModule,
  MatTableModule,
  MaterialModule,
  EditorModule

  ]
})
export class PageManagementModule { }
