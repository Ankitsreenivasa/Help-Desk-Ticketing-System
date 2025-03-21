import { Role } from "./enums";


export interface User {
  id: number;
  name: string;
  password?: string;
  email: string;
  role: Role;
}
