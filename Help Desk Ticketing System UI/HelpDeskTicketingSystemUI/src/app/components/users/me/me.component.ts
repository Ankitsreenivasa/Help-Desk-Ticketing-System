import { Component, OnInit } from '@angular/core';
import { MeService } from '../../../service/me.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/users';


@Component({
  selector: 'app-me',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
  user: User | null = null; // Treats user as a single object, not an array
  statCount = 0;
  statLabel = '';

  constructor(private meService: MeService) {}

  ngOnInit() {
    this.meService.getCurrentUser().subscribe(user => {
      this.user = user;

      if (user?.role === 'CUSTOMER') {
        this.statLabel = 'Tickets Created';
        this.meService.getTicketCount(user.id).subscribe(count => (this.statCount = count));
      } else if (user?.role === 'AGENT') {
        this.statLabel = 'Tickets Assigned';
        this.meService.getAssignedTicketCount(user.id).subscribe(count => (this.statCount = count));
      } else if (user?.role === 'ADMIN') {
        this.statLabel = 'Total Agents';
        this.meService.getTotalAgents().subscribe(count => (this.statCount = count));
      }
    });
  }
}
