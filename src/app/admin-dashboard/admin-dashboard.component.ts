import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}
  logout() {
    const confirmation = window.confirm('Are you sure you want to log out?');
    if (confirmation) {
      // Clear user session, token, or other related data
      // Example: localStorage.clear(); or sessionStorage.clear();
      this.router.navigate(['/login']);  // Redirect to the login page
    } else {
      // User canceled the logout action, do nothing
    }
  }


}
