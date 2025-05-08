import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-income',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css'],
})
export class AddIncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  imagePath = 'abc.jpg';
  budgetExceeded = false;
  currentIncome = "-"; 
  currentBudget = "-"; 

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: [''],
      date: [new Date(), Validators.required],
      budget: [null, [Validators.required, Validators.min(1)]],
    });

    this.incomeForm.get('budget')?.valueChanges.subscribe((budget) => {
      const amount = this.incomeForm.get('amount')?.value;
      this.budgetExceeded = amount && budget > amount * 0.8;
    });
  }

  submitForm(): void {
    if (this.incomeForm.valid) {
      alert('Income details saved successfully!');
      this.currentIncome = this.incomeForm.get('amount')?.value || "-"; 
      this.currentBudget = this.incomeForm.get('budget')?.value || "-"; 
      this.incomeForm.reset();
      this.budgetExceeded = false;
    }
  }
}
