import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ManagebookComponent } from './managebook/managebook.component';
import { AvailablebookComponent } from './availablebook/availablebook.component';
import { BorrowedbookComponent } from './borrowedbook/borrowedbook.component';
import { ReturnbookComponent } from './returnbook/returnbook.component';
import { authGuard } from './auth.guard';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { SearchComponent } from './search/search.component';
import { BookrequestComponent } from './bookrequest/bookrequest.component';
import { ManagerequestComponent } from './managerequest/managerequest.component';
import { ReportsComponent } from './reports/reports.component';
import { AddbookComponent } from './addbook/addbook.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewarrivalComponent } from './newarrival/newarrival.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'newarrival', component: NewarrivalComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  {
     path: 'admin-dashboard',
     component: AdminDashboardComponent,
     canActivate: [authGuard],
     children: [
      { path: 'managebook', component: ManagebookComponent },
      { path: 'manageuser', component: ManageuserComponent },
      { path: 'managerequest', component:  ManagerequestComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'addbook', component: AddbookComponent },
     { path: 'admin-dashboard/addbook/:id', component: AddbookComponent },
      { path: '', redirectTo: 'managebook', pathMatch: 'full' }
     ]
     },
  { path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'availablebook', component: AvailablebookComponent },
      { path: 'borrowedbook', component: BorrowedbookComponent },
      { path: 'returnbook', component: ReturnbookComponent },
      { path: 'bookrequest', component: BookrequestComponent },
      { path: '', redirectTo: 'availablebook', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
