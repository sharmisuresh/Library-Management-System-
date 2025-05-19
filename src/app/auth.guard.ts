import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
    const toastr = inject(ToastrService);
  const userEmail = localStorage.getItem('userEmail');
  const userRole  = localStorage.getItem('userRole');


  if (userEmail && userRole) {
    // User is “logged in,” so allow navigation
    return true;
  }

  // Not logged in → redirect to /login
  toastr.warning('You must log in first!');

  router.navigate(['/login']);
  return false;
};
