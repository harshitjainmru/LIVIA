import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcceptTestComponent } from './components/accept-test/accept-test.component';
import { InsuranceDetailsComponent } from './components/insurance-details/insurance-details.component';
import { FormsModule } from '@angular/forms';
import { VerifyOTPComponent } from './components/verify-otp/verify-otp.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { StatusPipeModule } from './customPipe/status-pipe/status-pipe.module';
import { AppHttpInterceptor } from './services/HttpInterceptor/http-interceptor.service';
import { AlertPopUpComponent } from './components/alert-pop-up/alert-pop-up.component';


@NgModule({
  declarations: [
    AppComponent,
    AcceptTestComponent,
    InsuranceDetailsComponent,
    VerifyOTPComponent,
    AlertPopUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    NgOtpInputModule,
    StatusPipeModule

  ],
  providers: [[{provide:HTTP_INTERCEPTORS,useClass:AppHttpInterceptor,multi:true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }
