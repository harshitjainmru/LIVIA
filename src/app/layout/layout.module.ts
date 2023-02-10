import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MaterialModule } from '../material/material.module';
import { RegisterFormService } from '../services/register-form.service';
import { LogoutPoupUpComponent } from '../components/logout-poup-up/logout-poup-up.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
@NgModule({
  declarations: [
    LayoutComponent,
    LogoutPoupUpComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatSidenavModule
 
  ],
  providers:[RegisterFormService]
})
export class LayoutModule { }
