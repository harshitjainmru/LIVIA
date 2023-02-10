import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusPipeModule } from 'src/app/customPipe/status-pipe/status-pipe.module';


@NgModule({
  declarations: [
    ClaimComponent
  ],
  imports: [
    CommonModule,
    ClaimRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StatusPipeModule

  ]
})
export class ClaimModule { }
