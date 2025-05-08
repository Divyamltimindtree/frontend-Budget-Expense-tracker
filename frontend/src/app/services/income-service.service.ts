import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../models/income';


@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private apiUrl = ''; 

  constructor(private http: HttpClient) {}

  getAllIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.apiUrl}`);
  }

  getIncomeById(incomeId: number): Observable<Income> {
    return this.http.get<Income>(`${this.apiUrl}/${incomeId}`);
  }

  addIncome(income: Income): Observable<Income> {
    return this.http.post<Income>(`${this.apiUrl}`, income);
  }

  updateIncome(incomeId: number, updatedIncome: Income): Observable<Income> {
    return this.http.put<Income>(`${this.apiUrl}/update/${incomeId}`, updatedIncome);
  }

  deleteIncome(incomeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${incomeId}`);
  }
}
