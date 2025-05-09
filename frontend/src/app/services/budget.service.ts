import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { AuthService } from './auth.service';
import { IncomeService } from './income.service';
import { ExpenseService } from './expense.service';

export interface BudgetItem {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpense: number;
  savings: number;
  incomeByCategory: { [key: string]: number };
  expenseByCategory: { [key: string]: number };
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) { }

  // Calculate budget summary from both income and expense data
  // This uses your existing services
  getBudgetSummary(): Observable<BudgetSummary> {
    return forkJoin({
      incomes: this.incomeService.getAllIncomes(),
      expenses: this.expenseService.getAllExpenses()
    }).pipe(
      map(result => {
        const incomes = result.incomes;
        const expenses = result.expenses;

        // Calculate total income
        const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
        
        // Calculate total expense
        const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
        
        // Calculate income by category
        const incomeByCategory: { [key: string]: number } = {};
        incomes.forEach(item => {
          const category = item.category || 'Uncategorized';
          incomeByCategory[category] = (incomeByCategory[category] || 0) + item.amount;
        });
        
        // Calculate expense by category
        const expenseByCategory: { [key: string]: number } = {};
        expenses.forEach(item => {
          const category = item.category || 'Uncategorized';
          expenseByCategory[category] = (expenseByCategory[category] || 0) + item.amount;
        });
        
        // Create budget summary
        return {
          totalIncome,
          totalExpense,
          savings: totalIncome - totalExpense,
          incomeByCategory,
          expenseByCategory
        };
      })
    );
  }
}