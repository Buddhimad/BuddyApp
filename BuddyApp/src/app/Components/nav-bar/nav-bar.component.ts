import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SharedService } from '../../Services/shared-service.service';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, MatButtonModule, MatIconModule,MatBadgeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{
  constructor(private sharedService: SharedService) {}
 

  openDrawer(): void {
    console.log("clicked nav button");
    this.sharedService.callSharedFunction();
  }
}
