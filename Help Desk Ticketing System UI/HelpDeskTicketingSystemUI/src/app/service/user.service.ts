import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleType, Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  registerUser(user: Users): Observable<Users> {
    console.log("Saved User", user)
    return this.http.post<Users>(this.apiUrl + '/register', user);
  }

  getCurrentUser(): Users {

    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '',
      role: RoleType.Customer
    };
  }
}
