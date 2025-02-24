export enum RoleType {
  Customer = 'Customer',
  Agent = 'Agent',
  Admin = 'Admin'
}

export interface Users{
  id?: number; // Optional as it may not be present when creating a new user
  name?: string;
  email?: string;
  password?: string;
  role?: RoleType;
}
