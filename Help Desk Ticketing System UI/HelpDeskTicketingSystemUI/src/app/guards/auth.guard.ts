import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = localStorage.getItem('userRole'); // Get role from localStorage
    const allowedRoles: string[] = route.data['roles']; // Get allowed roles from route data

    if (userRole && allowedRoles.includes(userRole)) {
      return true; // Allow access if the user role matches allowed roles
    }

    // Redirect unauthorized users
    this.router.navigate(['/']);
    return false;
  }
}
