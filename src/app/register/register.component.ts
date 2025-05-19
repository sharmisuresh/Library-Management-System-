import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string | any = null;
  successMessage: string | any = null;


  constructor(private fb: FormBuilder, private router: Router, private userService: UserService,private toastr: ToastrService) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }


  onSubmit() {
    if (this.registerForm.valid) {
      const userData = {
        userName: this.fullName?.value,
        mailId: this.email?.value,
        password: this.password?.value,
      };

      console.log("Sending to backend:", userData);

      this.userService.register(userData).subscribe({
        next: (response) => {
          console.log("Registration Success", response);
          this.toastr.success('Registered successfully!');

          this.router.navigate(['/login']);  // Navigate to login page after successful registration
        },
        error: (error) => {
          console.error(error);
          console.log(error);
          this.toastr.success('Registration failed. Try again.');
  // Show error message if registration fails
        }
      });
    }

    }



  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }


}
