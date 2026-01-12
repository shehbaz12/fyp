import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
import { InputFieldComponent } from '../../shared/components/input-field/input-field';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatProgressBarModule,
    MatIconModule,
    InputFieldComponent
  ],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);

  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    role: ['victim', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  isLoading = false;

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.authService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Account created! Please login.', 'OK', { duration: 3000 });
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Signup failed. Try again.', 'Close', { duration: 3000 });
      }
    });
  }

  getControl(name: string) { return this.signupForm.get(name) as any; }
}
