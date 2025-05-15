import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
 forgotPasswordForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required,Validators.minLength(8)]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get newPassword() {
    return this.forgotPasswordForm.get('newPassword');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const { email, newPassword } = this.forgotPasswordForm.value;

      this.userService.forgotPassword(email, newPassword).subscribe({
        next: (res: string) => {
          if (res === 'Password updated successfully' || res === 'success') {

            this.successMessage = res;
            this.errorMessage = '';
            this.forgotPasswordForm.reset();
              setTimeout(() => {
    this.successMessage = '';
  }, 3000);
          } else {
            this.successMessage = '';
            this.errorMessage = res;
          }
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage = err.error || 'Server error. Try again later.';
        }
      });
    }
  }
}
