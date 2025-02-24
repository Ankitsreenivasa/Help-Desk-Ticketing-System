
import { Ticket } from "./tickets";
import { Users } from "./users";

export interface Comment {
  id?: number;
  ticket: Ticket;
  user: Users;
  message: string;
  createdAt: string;
}
