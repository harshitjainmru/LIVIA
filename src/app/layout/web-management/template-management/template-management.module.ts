import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';
import { TemplateManagementRoutingModule } from './template-management-routing.module';
import { TemplateManagementComponent } from './template-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    TemplateManagementComponent
  ],
  imports: [
    CommonModule,
    TemplateManagementRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MaterialModule,
    ColorPickerModule
  ]
})
export class TemplateManagementModule { }
