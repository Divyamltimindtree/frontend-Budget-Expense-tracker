import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface NavLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() title: string = 'Personal Budget Tracker';
  @Input() links: NavLink[] = [
    { label: 'Home', route: '/' },
    { label: 'Login', route: '/login' },
    { label: 'Signup', route: '/signup' }
  ];

}
