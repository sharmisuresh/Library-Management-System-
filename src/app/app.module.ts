import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ManagebookComponent } from './managebook/managebook.component';
import { AvailablebookComponent } from './availablebook/availablebook.component';
import { BorrowedbookComponent } from './borrowedbook/borrowedbook.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { ReturnbookComponent } from './returnbook/returnbook.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { SearchComponent } from './search/search.component';
import { BookrequestComponent } from './bookrequest/bookrequest.component';
import { ManagerequestComponent } from './managerequest/managerequest.component';
import { ReportsComponent } from './reports/reports.component';
import { AddbookComponent } from './addbook/addbook.component';
import { NewarrivalComponent } from './newarrival/newarrival.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ManagebookComponent,
    AvailablebookComponent,
    BorrowedbookComponent,
    GoogleLoginComponent,
    ReturnbookComponent,
    ManageuserComponent,
    SearchComponent,
    BookrequestComponent,
    ManagerequestComponent,
    ReportsComponent,
    AddbookComponent,
    NewarrivalComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('72291812306-fllqq3vpv1dim4hkhjldsprtm8aeapo1.apps.googleusercontent.com')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
