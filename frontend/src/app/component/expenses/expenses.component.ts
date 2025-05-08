import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Expenses } from '../../models/expenses';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-expenses',
  imports: [CommonModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenseForm!: FormGroup;
  expenses: Expenses[] = []; 
  predefinedCategories = ['Food', 'Transport', 'Shopping', 'Bills']; 
  newCategory = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      categoryName: ['', Validators.required],
      description: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      newCategory: ['']
    });
  }

  addExpense(): void {
    if (this.expenseForm.valid) {
      this.expenses.push(this.expenseForm.value);
      this.expenseForm.reset();
    }
  }

  deleteExpense(index: number): void {
    this.expenses.splice(index, 1);
  }

  addCategory(): void {
    const category = this.expenseForm.get('newCategory')?.value?.trim();
    if (category) {
      this.predefinedCategories.push(category);
      this.expenseForm.get('newCategory')?.setValue(''); // ✅ Clears the input field
    }
  }
}
