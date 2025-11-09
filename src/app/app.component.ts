import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ToastModule
  ],
  template: `
    <p-toast></p-toast> 
    
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'gestao-frontend';
}