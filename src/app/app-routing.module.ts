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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  { path: 'managebook', component: ManagebookComponent, canActivate: [authGuard] },
  { path: 'availablebook', component: AvailablebookComponent, canActivate: [authGuard] },
  { path: 'borrowedbook', component: BorrowedbookComponent, canActivate: [authGuard] },
  { path: 'returnbook', component: ReturnbookComponent, canActivate: [authGuard] },
  { path: 'manageuser', component: ManageuserComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
