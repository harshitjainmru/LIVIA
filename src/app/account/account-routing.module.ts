import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NAV_TO_REGISTRATION, NAV_TO_RESET_PASSWORD } from '../Constants/commonRouters';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./onboarding/onboarding.module').then(
            (m) => m.OnboardingModule
          ),
      },
      {
        path: NAV_TO_REGISTRATION,
        loadChildren: () =>
          import('./verification/verification.module').then(
            (m) => m.VerificationModule
          ),
      },
      {
        path: NAV_TO_RESET_PASSWORD,
        loadChildren: () =>
          import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
