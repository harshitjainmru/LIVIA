import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  NAV_TO_CREATE_ECLAIM,
  NAV_TO_ECLAIM,
  NAV_TO_EDIT_PROFILE,
  NAV_TO_INITIATE_PAYMENT,
  NAV_TO_LAB_REPORT,
  NAV_TO_LAB_REQUEST,
  NAV_TO_LAB_TEST,
  NAV_TO_PAYMENT,
  NAV_TO_PROFILE,
  NAV_TO_REPORT_DETAIL,
  NAV_TO_WEB,
} from "../Constants/commonRouters";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,

    children: [
      {
        path: NAV_TO_LAB_REQUEST,
        loadChildren: () =>
          import("./requets/requets.module").then((m) => m.RequetsModule),
      },
      {
        path: NAV_TO_LAB_REPORT,
        loadChildren: () =>
          import("./reports/reports.module").then((m) => m.ReportsModule),
      },
      {
        path: NAV_TO_ECLAIM,
        loadChildren: () =>
          import("./claim/claim.module").then((m) => m.ClaimModule),
      },
      {
        path: NAV_TO_LAB_TEST,
        loadChildren: () =>
          import("./tests/tests.module").then((m) => m.TestsModule),
      },
      {
        path: NAV_TO_PAYMENT,
        loadChildren: () =>
          import("./payment/payment.module").then((m) => m.PaymentModule),
      },
      {
        path: NAV_TO_PROFILE,
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: NAV_TO_EDIT_PROFILE,
        loadChildren: () =>
          import("./edit-profile/edit-profile.module").then(
            (m) => m.EditProfileModule
          ),
      },
      {
        path: NAV_TO_REPORT_DETAIL,
        loadChildren: () =>
          import("./report-detail/report-detail.module").then(
            (m) => m.ReportDetailModule
          ),
      },
      {
        path: NAV_TO_CREATE_ECLAIM,
        loadChildren: () =>
          import("./create-claim/create-claim.module").then(
            (m) => m.CreateClaimModule
          ),
      },
      {
        path: NAV_TO_INITIATE_PAYMENT,
        loadChildren: () =>
          import("./initiate-payment/initiate-payment.module").then(
            (m) => m.InitiatePaymentModule
          ),
      },
      {
        path: NAV_TO_WEB,
        loadChildren: () =>
          import("./web-management/web-management.module").then(
            (m) => m.WebManagementModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
