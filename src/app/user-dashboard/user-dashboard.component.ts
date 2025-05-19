import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { SubscriptionLike } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit, OnDestroy {

      private popStateHandler: any;

  constructor(private router: Router, private location: Location,private toastr: ToastrService) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');

    if (!userEmail || !userRole) {
      this.router.navigate(['/login']);

    }
     history.pushState(null, '', location.href);
      this.popStateHandler = () => {
      history.pushState(null, '', location.href);
    };

    // Listen to browser back button event
    window.addEventListener('popstate', this.popStateHandler);
  }

  ngOnDestroy(): void {
    // Remove event listener when component destroyed
    if (this.popStateHandler) {
      window.removeEventListener('popstate', this.popStateHandler);
    }
  }

  confirmLogout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.clear();
      sessionStorage.clear();
localStorage.removeItem('token');
        // Navigate to login and replace history entry
      // Navigate to login and reset history so back won't work
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  goToBorrowedBooks() {
    this.router.navigate(['/borrowedbook']);
  }


}
