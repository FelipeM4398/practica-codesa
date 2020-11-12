import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../interfaces/rol.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get<Rol[]>(`${this.apiUrl}/roles`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getUsers() {
    return this.http.get<Usuario[]>(`${this.apiUrl}/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getUsersByName(name: string) {
    return this.http.get<Usuario[]>(`${this.apiUrl}/users/${name}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  saveUser(user: Usuario) {
    return this.http.post(`${this.apiUrl}/users`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  updateUser(user: Usuario) {
    return this.http.put(`${this.apiUrl}/users`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
