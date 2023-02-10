import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequetsComponent } from './requets.component';

const routes: Routes = [
  {path:'',component:RequetsComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequetsRoutingModule { }
