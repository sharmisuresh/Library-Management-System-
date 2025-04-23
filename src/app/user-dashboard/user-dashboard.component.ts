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

  logout() {

    // Clear any tokens or user info
    this.router.navigate(['/login']);
  }

}
