import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router, private toastr: ToastrService) {}
  logout() {
    const confirmation = window.confirm('Are you sure you want to log out?');
    if (confirmation) {
      localStorage.clear();
      localStorage.removeItem('token');
      this.toastr.success('Logged out successfully!');

      this.router.navigate(['/login']);
    } else {
      // User canceled the logout action, do nothing
    }
  }


}
