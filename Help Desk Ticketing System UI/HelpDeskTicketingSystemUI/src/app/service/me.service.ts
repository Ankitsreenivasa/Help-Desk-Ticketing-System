import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class MeService {
  private apiUrl = 'http://localhost:3000'; // UPDATE based on requirements

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User | null> {
    const userId = localStorage.getItem('userId');
    if (!userId) return of(null);
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`).pipe(
      catchError(() => of(null)) // Handles errors gracefully
    );
  }

  getTicketCount(userId: number): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets?createdBy=${userId}`).pipe(
      map(tickets => tickets.length),
      catchError(() => of(0)) // Default to 0 on error
    );
  }

  getAssignedTicketCount(agentId: number): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets?assignedTo=${agentId}`).pipe(
      map(tickets => tickets.length),
      catchError(() => of(0))
    );
  }

  getTotalAgents(): Observable<number> {
    return this.http.get<any[]>(`${this.apiUrl}/users?role=AGENT`).pipe(
      map(agents => agents.length),
      catchError(() => of(0))
    );
  }
}
