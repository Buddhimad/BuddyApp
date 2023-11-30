import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,MatInputModule,MatFormFieldModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  hide = true;
  constructor(private router: Router) { }

  navigateToDestination(destination:String) {
    this.router.navigate([destination]);
  }
}
