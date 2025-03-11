import { Routes } from "@angular/router";
import { AuthGuard} from "./guards/auth.guard";
import { HomeComponent } from "./components/users/home/home.component";
import { RegisterComponent } from "./components/users/register/register.component";
import { LoginComponent } from "./components/users/login/login.component";
import { CustomerDashboardComponent } from "./components/dashboards/customer-dashboard/customer-dashboard.component";
import { AgentDashboardComponent } from "./components/dashboards/agent-dashboard/agent-dashboard.component";
import { AdminDashboardComponent } from "./components/dashboards/admin-dashboard/admin-dashboard.component";
import { MeComponent } from "./components/users/me/me.component";


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MeComponent },

  // Customer Dashboard (Only Accessible to CUSTOMERS)
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { roles: ['CUSTOMER'] } },

  // Agent Dashboard (Only Accessible to AGENTS)
  { path: 'agent-dashboard', component: AgentDashboardComponent, canActivate: [AuthGuard], data: { roles: ['AGENT'] } },

  // Admin Dashboard (Only Accessible to ADMINS)
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },

  // Redirect unknown routes to login
  { path: '**', redirectTo: '/login' }
];
