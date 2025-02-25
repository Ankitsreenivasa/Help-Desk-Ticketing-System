import { Routes } from "@angular/router";
import { authGuard } from "./guards/auth.guard";
import { HomeComponent } from "./components/users/home/home.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { LoginComponent } from "./components/users/login/login.component";
import { CreateTicketsComponent } from "./components/tickets/create-tickets/create-tickets.component";
import { CustomerDashboardComponent } from "./components/dashboards/customer-dashboard/customer-dashboard.component";
import { AgentDashboardComponent } from "./components/dashboards/agent-dashboard/agent-dashboard.component";
import { AdminDashboardComponent } from "./components/dashboards/admin-dashboard/admin-dashboard.component";
import { RoleType } from "./models/users";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // Customer-specific routes
  { path: 'create-tickets', component: CreateTicketsComponent, canActivate: [authGuard], data: { role: RoleType.Customer } },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [authGuard], data: { role: RoleType.Customer } },

  // Agent-specific routes
  { path: 'agent-dashboard', component: AgentDashboardComponent, canActivate: [authGuard], data: { role: RoleType.Agent } },

  // Admin-specific routes
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { role: RoleType.Admin } },
];
