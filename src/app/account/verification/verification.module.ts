import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddLabDetailComponent } from './add-lab-detail/add-lab-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDocComponent } from './add-doc/add-doc.component';
import { AddLabPicComponent } from './add-lab-pic/add-lab-pic.component';
import { RegisterFormService } from 'src/app/services/register-form.service';
import { AddressPopUpComponent } from '../../components/address-pop-up/address-pop-up.component'

@NgModule({
  declarations: [
    VerificationComponent,
    AddLabDetailComponent,
    AddDocComponent,
    AddLabPicComponent,
    AddressPopUpComponent
  ],
  imports: [
    CommonModule,
    VerificationRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[RegisterFormService]
})
export class VerificationModule { }
