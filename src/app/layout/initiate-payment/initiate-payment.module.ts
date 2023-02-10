import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitiatePaymentRoutingModule } from './initiate-payment-routing.module';
import { InitiatePaymentComponent } from './initiate-payment.component';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    InitiatePaymentComponent
  ],
  imports: [
    CommonModule,
    InitiatePaymentRoutingModule,
    MatCardModule,
    MaterialModule

  ]
})
export class InitiatePaymentModule { }
