import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole(); // Get user role from token

  // If user is NOT logged in, redirect to login
  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  // Check if the route requires a specific role
  const expectedRole = route.data?.['role'];
  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/home']); // Redirect unauthorized users
    return false;
  }

  return true; // Allow access
};
