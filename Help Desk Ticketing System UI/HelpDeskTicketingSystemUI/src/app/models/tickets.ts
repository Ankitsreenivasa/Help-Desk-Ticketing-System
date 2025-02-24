import { Users } from "./users";

export enum TicketStatus {
  Open = 'Open',
  InProgress = 'InProgress',
  Resolved = 'Resolved',
  Closed = 'Closed'
}

export enum TicketPriority {
  Low,
  Medium,
  High,
}

export interface Ticket {
  id?: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdBy: Users;
  assignedTo?: Users;
  createdAt: string;
  updatedAt: string;
}
