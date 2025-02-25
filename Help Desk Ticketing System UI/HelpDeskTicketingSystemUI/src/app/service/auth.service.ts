import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Backend API
  private authTokenKey = 'authToken';

  // ✅ BehaviorSubject to track authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Login function
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // ✅ Store token after login
  storeToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
    this.isAuthenticatedSubject.next(true); // Update auth state
  }

  // ✅ Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  // ✅ Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ✅ Logout function
  logout(): void {
    localStorage.removeItem(this.authTokenKey);
    this.isAuthenticatedSubject.next(false); // Update auth state
    this.router.navigate(['/login']);
  }

  // ✅ Get user role from token (Safely decoding JWT)
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
      return payload.role; // Assuming the token contains "role" field
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
