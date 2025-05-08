import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // constructor(private router: Router) {}

  // navigateTo(page: string) {
  //   this.router.navigate([`/${page}`]);
  // }

  // logout() {
  //   // Implement your logout logic here
  //   console.log('Logged out');
  // }
}
