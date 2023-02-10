import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAV_TO_PAGE, NAV_TO_TEMPLATE } from 'src/app/Constants/commonRouters';
import { WebManagementComponent } from './web-management.component';

const routes: Routes = [
  {path:'',component:WebManagementComponent,children:[
  
    {
      path: NAV_TO_PAGE,
      loadChildren: () =>
        import("./page-management/page-management.module").then((m) => m.PageManagementModule),
    },
    {
      path: NAV_TO_TEMPLATE,
      loadChildren: () =>
        import("./template-management/template-management.module").then((m) => m.TemplateManagementModule),
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebManagementRoutingModule { }
