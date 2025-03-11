import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AgentDashboardService } from '../../../service/agent-dashboard.service';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.css']
})
export class AgentDashboardComponent implements OnInit {
  unassignedTickets: any[] = [];
  assignedTickets: any[] = []; // New array for assigned tickets
  userId = localStorage.getItem('userId');
  agentName = localStorage.getItem('userName');
  commentForms: { [key: number]: FormGroup } = {};

  constructor(private agentService: AgentDashboardService) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.agentService.getAllTickets().subscribe({
      next: (tickets) => {
        this.unassignedTickets = tickets.filter(ticket => !ticket.assignedTo);
        this.assignedTickets = tickets.filter(ticket => ticket.assignedTo === this.userId);
        this.initializeCommentForms();
      },
      error: (err) => console.error('Error fetching tickets:', err)
    });
  }

  initializeCommentForms() {
    this.commentForms = {};
    [...this.unassignedTickets, ...this.assignedTickets].forEach(ticket => {
      this.commentForms[ticket.id] = new FormGroup({
        comment: new FormControl('', Validators.required)
      });
    });
  }

  assignTicket(ticketId: number) {
    this.agentService.assignTicket(ticketId, this.userId, this.agentName).subscribe(() => {
      this.loadTickets(); // Refresh tickets after assignment
    });
  }

  updateStatus(ticketId: number, event: Event) {
    const status = (event.target as HTMLSelectElement).value;
    this.agentService.updateTicketStatus(ticketId, status, new Date().toISOString()).subscribe(() => this.loadTickets());
  }


  addComment(ticketId: number) {
    if (!this.commentForms[ticketId] || this.commentForms[ticketId].invalid) return;

    const commentData = {
      ticketId,
      agentName: this.agentName || 'Agent',
      comment: this.commentForms[ticketId].value.comment
    };

    this.agentService.addComment(commentData.ticketId, commentData.agentName, commentData.comment).subscribe(() => {
      this.commentForms[ticketId].reset();
      this.loadTickets();
    });
  }
}
