import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {
  private apiUrl = 'http://localhost:3000/tickets';
  private commentsUrl = 'http://localhost:3000/comments';

  constructor(private http: HttpClient) {}

  getCustomerTickets(userId: string | null): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?createdBy=${userId}`);
  }

  createTicket(ticketData: any): Observable<any> {
    return this.http.post(this.apiUrl, ticketData);
  }

  getTicketDetails(ticketId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${ticketId}`);
  }

  getTicketComments(ticketId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.commentsUrl}?ticketId=${ticketId}`);
  }
}
