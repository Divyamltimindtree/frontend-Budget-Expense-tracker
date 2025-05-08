import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
   imports: [CommonModule, ReactiveFormsModule], // Direct imports instead of app.module.ts
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    console.log("this.registerForm.invalid : " + this.registerForm.invalid);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registration Successful!', this.registerForm.value);
    }
  }  

}
