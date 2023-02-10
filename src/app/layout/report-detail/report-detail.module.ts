import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDetailRoutingModule } from './report-detail-routing.module';
import { ReportDetailComponent } from './report-detail.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusPipeModule } from 'src/app/customPipe/status-pipe/status-pipe.module';


@NgModule({
  declarations: [
    ReportDetailComponent,
  ],
  imports: [
    CommonModule,
    ReportDetailRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    StatusPipeModule
  ]
})
export class ReportDetailModule { }
