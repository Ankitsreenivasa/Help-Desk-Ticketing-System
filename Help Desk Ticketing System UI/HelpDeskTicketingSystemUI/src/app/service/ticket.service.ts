import { RoleType, Users } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../models/tickets';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  url = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    ticket.priority = 0;
    ticket.createdBy = {
      id: 1,
      name: 'John Doe',
      email: '',
      password: '',
      role: RoleType.Customer,
    };

    console.log('Saved Ticket', ticket);

    return this.http.post<Ticket>(this.url, ticket);
  }
}
