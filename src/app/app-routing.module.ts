import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthenticationGuard } from './services/Guards/loginGuards/authenticationGuard/authentication.guard';
import { LoginGuard } from './services/Guards/loginGuards/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
      // canActivate:[LoginGuard],
    },
    {
      path: '',
      
    loadChildren: () =>
    import('./layout/layout.module').then((m) => m.LayoutModule),
    // canActivate:[AuthenticationGuard],

  },
  {
    path: 'validation',
    loadChildren: () =>
      import('./validation/validation.module').then((m) => m.ValidationModule),

  },
  // { path: '**', component: PageNotFoundComponent },
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
