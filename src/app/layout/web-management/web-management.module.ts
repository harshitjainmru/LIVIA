import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebManagementRoutingModule } from './web-management-routing.module';
import { WebManagementComponent } from './web-management.component';
import { MaterialModule } from 'src/app/material/material.module';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    WebManagementComponent,
  ],
  imports: [
    CommonModule,
    WebManagementRoutingModule,
    MaterialModule,
    MatSidenavModule
  ]
})
export class WebManagementModule { }
