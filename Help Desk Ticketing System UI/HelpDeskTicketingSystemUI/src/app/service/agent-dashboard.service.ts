import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentDashboardService {
  private apiUrl = 'http://localhost:3000/tickets';
  private commentsUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getUnassignedTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?assignedTo=null`);
  }

  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  assignTicket(ticketId: number, agentId: string | null, agentName: string | null): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${ticketId}`, {
      assignedTo: agentId,
      assignedAgentName: agentName // Ensure the agent name is updated
    });
  }

  updateTicketStatus(ticketId: number, status: string, updatedAt: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${ticketId}`, { status, updatedAt });
  }


  addComment(ticketId: number, agentName: string, comment: string): Observable<any> {
    return this.http.post(this.commentsUrl, { ticketId, agentName, comment });
  }
}
