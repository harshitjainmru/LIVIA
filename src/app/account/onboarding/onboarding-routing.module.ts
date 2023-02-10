import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NAV_TO_LOGIN, NAV_TO_SIGNUP } from "src/app/Constants/commonRouters";
import { OnboardingComponent } from "./onboarding.component";

const routes: Routes = [
  {
    path: "",
    component: OnboardingComponent,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      {
        path: NAV_TO_LOGIN,
        loadChildren: () =>
          import("./login/login.module").then((m) => m.LoginModule),
      },
      {
        path: NAV_TO_SIGNUP,
        loadChildren: () =>
          import("./signup/signup.module").then((m) => m.SignupModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingRoutingModule {}
