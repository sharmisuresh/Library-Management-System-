import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      mailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
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
          this.router.navigate(['/admin-dashboard']);
        } else if (res === 'user') {
          alert('User login successful');
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



  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
