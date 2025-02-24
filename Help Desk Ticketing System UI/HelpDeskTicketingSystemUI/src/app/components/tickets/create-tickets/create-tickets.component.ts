import { TicketService } from './../../../service/ticket.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ticket, TicketPriority, TicketStatus } from '../../../models/tickets';

@Component({
  selector: 'app-create-tickets',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-tickets.component.html',
  styleUrls: ['./create-tickets.component.css']
})
export class CreateTicketsComponent {

  createTicketForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl( 0, Validators.required),
    status: new FormControl('Open', Validators.required),
  });

  constructor(private ticketService: TicketService) {}

  createTicket() {
    if (this.createTicketForm.valid) {
      console.log('Form Value:', this.createTicketForm.value); // Log form value to console
      this.ticketService.createTicket(this.createTicketForm.value as Ticket).subscribe(() => {
        alert('Ticket created successfully!');
        this.createTicketForm.reset();
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
