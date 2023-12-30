import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-shop-profile',
  standalone: true,
  imports: [CommonModule,MatIconModule,MatButtonModule,MatSelectModule,MatInputModule,MatFormFieldModule],
  templateUrl: './shop-profile.component.html',
  styleUrl: './shop-profile.component.css'
})
export class ShopProfileComponent {

}
