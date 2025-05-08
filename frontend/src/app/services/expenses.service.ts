import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expenses } from '../models/expenses';


@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = ''; 

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expenses[]> {
    return this.http.get<Expenses[]>(this.apiUrl);
  }

  getExpenseById(expenseId: number): Observable<Expenses> {
    return this.http.get<Expenses>(`${this.apiUrl}/${expenseId}`);
  }

  addExpense(expense: Expenses): Observable<Expenses> {
    return this.http.post<Expenses>(this.apiUrl, expense);
  }

  updateExpense(expenseId: number, expense: Expenses): Observable<Expenses> {
    return this.http.put<Expenses>(`${this.apiUrl}/${expenseId}`, expense);
  }

  deleteExpense(expenseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${expenseId}`);
  }
}
