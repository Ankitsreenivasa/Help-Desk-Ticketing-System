import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerDashboardService } from '../../../service/customer-dashboard.service';
import { Ticket } from '../../../models/tickets';
import { Comment } from '../../../models/comments';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  selectedTicket: any = null;
  comments: Comment[] = [];
  ticketForm: FormGroup; // Ticket creation form

  constructor(private customerService: CustomerDashboardService) {
    this.ticketForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      priority: new FormControl('Low', Validators.required)
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId');
    this.customerService.getCustomerTickets(userId).subscribe({
      next: (tickets) => this.tickets = tickets,
      error: (err) => console.error('Error fetching tickets:', err)
    });
  }

  createTicket() {
    if (this.ticketForm.invalid) return;

    const newTicket = {
      ...this.ticketForm.value,
      createdBy: localStorage.getItem('userId'),
      status: 'OPEN',
      assignedTo: null,
      createdAt: new Date().toISOString(), // Store created timestamp
      updatedAt: new Date().toISOString()  // Initial update timestamp
    };

    this.customerService.createTicket(newTicket).subscribe({
      next: (ticket) => {
        this.tickets.push(ticket);
        this.ticketForm.reset();
      },
      error: (err) => console.error('Error creating ticket:', err)
    });
  }


  viewTicketDetails(ticketId: number) {
    this.customerService.getTicketDetails(ticketId).subscribe(ticket => this.selectedTicket = ticket);
    this.customerService.getTicketComments(ticketId).subscribe(comments => this.comments = comments);
  }
}
