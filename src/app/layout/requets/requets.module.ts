import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequetsRoutingModule } from './requets-routing.module';
import { RequetsComponent } from './requets.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RequetsComponent
  ],
  imports: [
    CommonModule,
    RequetsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[]
})
export class RequetsModule { }
