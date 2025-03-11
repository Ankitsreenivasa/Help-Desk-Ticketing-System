import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private apiUrl = 'http://localhost:3000/tickets';
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAgentPerformance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?status=RESOLVED`).pipe(
      map((tickets) => {
        const agentStats: { [key: string]: number } = {};
        tickets.forEach(ticket => {
          if (ticket.assignedTo) {
            agentStats[ticket.assignedTo] = (agentStats[ticket.assignedTo] || 0) + 1;
          }
        });

        return Object.entries(agentStats).map(([agent, resolvedTickets]) => ({
          agentName: agent,
          resolvedTickets
        }));
      })
    );
  }

  getResolutionTimeReport(): Observable<string> {
    return this.http.get<any[]>(`${this.apiUrl}?status=RESOLVED`).pipe(
      map((tickets) => {
        if (tickets.length === 0) return 'N/A';

        const totalTime = tickets.reduce((sum, ticket) => {
          const created = new Date(ticket.createdAt).getTime();
          const updated = new Date(ticket.updatedAt).getTime();
          return sum + (updated - created);
        }, 0);

        const avgTimeMs = totalTime / tickets.length;
        const avgTimeHours = (avgTimeMs / (1000 * 60 * 60)).toFixed(2);
        return `${avgTimeHours} hours`;
      })
    );
  }
}
