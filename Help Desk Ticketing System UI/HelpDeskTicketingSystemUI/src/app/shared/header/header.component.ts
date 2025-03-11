import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  userRole: string | null = null;
  dashboardLink = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isLoggedIn => {
      this.isAuthenticated = isLoggedIn;
      this.userRole = this.authService.getUserRole();
      this.setDashboardLink();
    });
  }

  setDashboardLink() {
    const roleDashboard: Record<string, string> = {
      ADMIN: '/admin-dashboard',
      AGENT: '/agent-dashboard',
      CUSTOMER: '/customer-dashboard'
    };
    this.dashboardLink = roleDashboard[this.userRole?.toUpperCase() ?? ''] || '/home';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
