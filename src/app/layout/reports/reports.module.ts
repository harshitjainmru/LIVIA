import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusPipeModule } from 'src/app/customPipe/status-pipe/status-pipe.module';


@NgModule({
  declarations: [
    ReportsComponent,

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StatusPipeModule
  ],
 
 
})
export class ReportsModule { }
