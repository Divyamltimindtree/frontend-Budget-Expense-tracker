import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncomeService } from '../../services/income.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-income',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css'],
})
export class AddIncomeComponent implements OnInit {
  incomeForm!: FormGroup;
  budgetExceeded = false;
  budgetInvalid = false;
  imagePath = 'abc.jpg';
  currentIncome = '-';
  currentBudget = '-';
  incomeId: number | null = null; // ✅ Stores current income ID

  constructor(private fb: FormBuilder, private incomeService: IncomeService) {}

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      budget: [null, [Validators.required, Validators.min(1)]],
    });

    this.incomeForm.get('budget')?.valueChanges.subscribe((budget) => {
      const amount = this.incomeForm.get('amount')?.value;
      this.budgetExceeded = amount && budget > amount * 0.8;
      this.budgetInvalid = amount && budget > amount;
    });
  }

  submitForm(): void {
    if (this.incomeForm.valid && !this.budgetInvalid) {
      const incomeData = this.incomeForm.value;

      this.incomeService.addIncome(incomeData).subscribe(
        (response) => {
          alert('Income details saved successfully!');
          this.currentIncome = this.incomeForm.get('amount')?.value || '-';
          this.currentBudget = this.incomeForm.get('budget')?.value || '-';
          this.incomeId = response.id; // ✅ Store the newly added income ID
        },
        (error) => {
          alert('Failed to save income details. Please try again.');
        }
      );
    }
  }

  updateIncome(): void {
    if (this.incomeId) {
      const updatedData = this.incomeForm.value;

      this.incomeService.updateIncome(this.incomeId, updatedData).subscribe(
        () => alert('Income updated successfully!'),
        () => alert('Failed to update income!')
      );
    }
  }

  deleteIncome(): void {
    if (this.incomeId) {
      this.incomeService.deleteIncome(this.incomeId).subscribe(
        () => {
          alert('Income deleted successfully!');
          this.currentIncome = '-';
          this.currentBudget = '-';
          this.incomeId = null;
          this.incomeForm.reset();
        },
        () => alert('Failed to delete income!')
      );
    }
  }
}
