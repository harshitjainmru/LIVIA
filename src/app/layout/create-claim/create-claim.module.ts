import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateClaimRoutingModule } from './create-claim-routing.module';
import { CreateClaimComponent } from './create-claim.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    CreateClaimComponent
  ],
  imports: [
    CommonModule,
    CreateClaimRoutingModule,
    MaterialModule
  ]
})
export class CreateClaimModule { }
