import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../../../service/admin-dashboard.service';
import { Ticket } from '../../../models/tickets';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  tickets: Ticket[] = [];
  agentsPerformance: any[] = []; // Store agent performance stats
  avgResolutionTime: string = ''; // Average resolution time report

  constructor(private adminService: AdminDashboardService) {}

  ngOnInit() {
    this.loadTickets();
    this.loadReports();
  }

  loadTickets() {
    this.adminService.getAllTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
      },
      error: (err) => console.error('Error fetching tickets:', err)
    });
  }

  loadReports() {
    this.adminService.getAgentPerformance().subscribe({
      next: (performance) => {
        this.agentsPerformance = performance;
      },
      error: (err) => console.error('Error fetching performance:', err)
    });

    this.adminService.getResolutionTimeReport().subscribe({
      next: (avgTime) => {
        this.avgResolutionTime = avgTime;
      },
      error: (err) => console.error('Error fetching resolution report:', err)
    });
  }
}
