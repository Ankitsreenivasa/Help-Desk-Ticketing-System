import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; // JSON Server Fake API

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`).pipe(
      map(users => {
        if (users.length > 0 && users[0].password === password) {
          const user = users[0];

          // Store user data in localStorage
          this.storeToken('fake-jwt-token'); // Simulated JWT Token
          localStorage.setItem('userId', user.id);
          localStorage.setItem('userRole', user.role);

          this.isAuthenticatedSubject.next(true);
          return { token: 'fake-jwt-token', user };
        }
        return null;
      })
    );
  }

  // Add this missing method
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}
