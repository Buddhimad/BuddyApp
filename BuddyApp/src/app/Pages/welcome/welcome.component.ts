import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from '@angular/router';
import {WelcomeService} from "./welcome.service";
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  firstFormGroup: any;
  hide = true;
  user = {
    username: '',
    password: ''
  }

  constructor(private router: Router, private welcomeService: WelcomeService, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

  }

  navigateToDestination(destination: String) {
    this.router.navigate([destination]);
  }

  login(e: any) {
    e.preventDefault()
    this.welcomeService.login(this.user).subscribe(result => {
      if (result) {
        // this.router.navigate(['/customer/dashboard']);
      }
    })
  }
}
