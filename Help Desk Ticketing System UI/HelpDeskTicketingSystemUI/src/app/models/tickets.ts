import { TicketStatus, TicketPriority } from './enums';
import { User } from './users';


export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdBy: number; // User ID
  assignedTo?: number; // Agent ID (optional)
  createdAt: string;
  updatedAt: string;

  // Optional UI properties (filled after fetching related data)
  createdByUser?: User;
  assignedToUser?: User;
}
