import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  signup(user: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/signup`, user, { responseType: 'text' });
    // return this.http.post(`${this.baseUrl}/signup`, user);
  }     

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  updateUser(updatedUser: any): Observable<string> {
    return this.http.put(`${this.baseUrl}/update`, updatedUser, {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  deleteUser(): Observable<string> {
    return this.http.delete(`${this.baseUrl}/delete`, {
      headers: this.getAuthHeaders(),
      responseType: 'text',
    });
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getAuthHeaders() {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
