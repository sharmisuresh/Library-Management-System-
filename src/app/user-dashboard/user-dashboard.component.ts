import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private router: Router) {}

  confirmLogout() {
    if (confirm('Are you sure you want to logout?')) {
      // Clear local storage or session if needed
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
  goToBorrowedBooks() {
    this.router.navigate(['/borrowedbook']);
  }

}
