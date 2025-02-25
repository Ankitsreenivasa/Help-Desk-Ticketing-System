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
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  loginUser() {
    if (this.loginForm.invalid) {
      alert('Please enter valid email and password.');
      return;
    }

    const credentials = this.loginForm.value as { email: string; password: string };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authService.storeToken(response.token); // Store token
        this.loginForm.reset();
        alert('User logged in successfully!');

        const role = this.authService.getUserRole(); // Get user role from token

        // Navigate based on user role
        const dashboardRoutes: Record<string, string> = {
          Admin: '/admin-dashboard',
          Agent: '/agent-dashboard',
          Customer: '/customer-dashboard'
        };

        this.router.navigate([dashboardRoutes[role ?? ''] || '/home']); // Default to home if no role found
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials. Please try again.');
      },
    });
  }
}
