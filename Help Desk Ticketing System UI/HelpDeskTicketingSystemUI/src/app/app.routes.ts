import { Routes } from '@angular/router';
import { HomeComponent } from './components/users/home/home.component';
import { RegisterComponent } from './components/users/register/register.component';
import { CreateTicketsComponent } from './components/tickets/create-tickets/create-tickets.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';
import { AgentDashboardComponent } from './components/dashboards/agent-dashboard/agent-dashboard.component';
import { CustomerDashboardComponent } from './components/dashboards/customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './components/users/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-tickets', component: CreateTicketsComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'agent-dashboard', component: AgentDashboardComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
];
