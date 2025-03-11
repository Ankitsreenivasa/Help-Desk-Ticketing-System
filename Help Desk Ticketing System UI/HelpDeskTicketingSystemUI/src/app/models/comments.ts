import { User } from "./users";

export interface Comment {
  id: number;
  ticketId: number;
  userId: number;
  message: string;
  createdAt: string;

  // Optional UI property
  user?: User;
}
