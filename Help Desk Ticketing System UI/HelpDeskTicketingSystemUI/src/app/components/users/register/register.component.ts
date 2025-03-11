import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../service/register.service';
import { Role } from '../../../models/enums'; // Import Role enum
import { User } from '../../../models/users';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Define FormGroup with types matching `User` interface
  registrationForm = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl<Role>(Role.CUSTOMER, Validators.required) // Using Role Enum
  });

  constructor(private registerService: RegisterService, private router: Router) {}

  registerUser() {
    if (this.registrationForm.invalid) {
      alert('Please fill all fields correctly.');
      return;
    }

    // Map form values to `User` object
    const newUser: User = {
      id: Math.floor(Math.random() * 10000), // Generates a unique ID (backend should handle this in production)
      name: this.registrationForm.value.name!,
      email: this.registrationForm.value.email!,
      password: this.registrationForm.value.password!,
      role: this.registrationForm.value.role! as Role // Ensures role matches the enum
    };

    // Send mapped `User` object to the service
    this.registerService.register(newUser).subscribe({
      next: () => {
        this.registrationForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        alert('Registration failed. Try again.');
      }
    });
  }
}
