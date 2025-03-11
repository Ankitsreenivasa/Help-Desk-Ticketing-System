import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.required, Validators.email]), // Fixed types
    password: new FormControl<string | null>(null, [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    if (this.loginForm.invalid) {
      alert('Please enter valid email and password.');
      return;
    }

    // Ensure the values are properly extracted
    const credentials = {
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? ''
    };

    this.authService.login(credentials.email, credentials.password).subscribe({
      next: (response) => {
        if (response) {
          this.authService.storeToken(response.token); // Store token properly
          this.loginForm.reset();
          // alert('User logged in successfully!');

          const role = this.authService.getUserRole(); // Fetch role from localStorage

          const dashboardRoutes: Record<string, string> = {
            ADMIN: '/admin-dashboard',
            AGENT: '/agent-dashboard',
            CUSTOMER: '/customer-dashboard'
          };

          this.router.navigate([dashboardRoutes[role?.toUpperCase() ?? ''] || '/home']); // Default to home
        } else {
          alert('Invalid credentials. Please try again.');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials. Please try again.');
      }
    });
  }
}
