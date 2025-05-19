import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: SocialAuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.authService.authState.subscribe((user: SocialUser) => {
      if (user) {
        console.log('Google User:', user);
    this.toastr.success('Google login successful');

    this.sendEmailToBackend(user.email, user.name);
       }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }


    const credentials = this.loginForm.value; // { email: "...", password: "..." }

    this.userService.login(credentials).subscribe({
      next: (res: string) => {
        console.log('Server Response:', res);

        if (res === 'admin') {
          this.toastr.success('Admin login successful');

          localStorage.setItem('userEmail', credentials.mailId);
          localStorage.setItem('userRole', 'admin');
          this.router.navigate(['/admin-dashboard']);
         window.history.replaceState({}, '', '/admin-dashboard');
        } else if (res === 'user') {
          this.toastr.success('User login successful');

          localStorage.setItem('userEmail', credentials.mailId);
          localStorage.setItem('userRole', 'user');
          this.router.navigate(['/user-dashboard']);
         window.history.replaceState({}, '', '/user-dashboard');
        }else if (res === 'Invalid password') {
          this.toastr.warning('Invalid password');

        } else {
          this.toastr.warning('User Not Found');

        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Something went wrong! Please try again later.';
      }
    });
  }
  sendEmailToBackend(email: string, name: string): void {
    this.userService.googleLogin(email, name).subscribe({
      next: (res: string) => {
        const role = res;
        console.log('Role from backend:', role);

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);

        if (role === 'admin') {
          localStorage.setItem('userEmail', email);
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'user') {
          localStorage.setItem('userEmail', email);
          this.router.navigate(['/user-dashboard']);
        } else {
          this.toastr.warning('Unauthorized user');

        }
      },
      error: (err) => {
        console.error('Google_login_backend_error:', err);
        this.toastr.error('Login failed on server');

      }

    });
  }


  get mailId() {
    return this.loginForm.get('mailId');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
