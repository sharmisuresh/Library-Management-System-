import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';


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
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.authService.authState.subscribe((user: SocialUser) => {
      if (user) {
        console.log('Google User:', user);
    alert('Google login successful');
    this.sendEmailToBackend(user.email, user.name);
      //   localStorage.setItem('userEmail', user.email);
      //   alert('Google login successful');
      //   this.router.navigate(['/user-dashboard']);
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
          alert('Admin login successful');
          localStorage.setItem('userEmail', credentials.mailId);
          this.router.navigate(['/admin-dashboard']);
        } else if (res === 'user') {
          alert('User login successful');
          localStorage.setItem('userEmail', credentials.mailId);
          this.router.navigate(['/user-dashboard']);
        }else if (res === 'Invalid password') {
          alert('Invalid password');
        } else {
          alert('User Not Found');
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

        if (role === 'admin') {
          localStorage.setItem('userEmail', email);
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'user') {
          localStorage.setItem('userEmail', email);
          this.router.navigate(['/user-dashboard']);
        } else {
          alert('Unauthorized user');
        }
      },
      error: (err) => {
        console.error('Google_login_backend_error:', err);
        alert('Login failed on server');
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
