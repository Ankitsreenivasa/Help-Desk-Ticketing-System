import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { RoleType, Users } from '../../../models/users';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService) {}

  saveUser() {
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value as Users).subscribe(() => {
        alert('User registered successfully!');
        this.registerForm.reset();
      });
    }
  }
}
