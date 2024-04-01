import {Component, OnInit} from '@angular/core';
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
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css',]
})
export class WelcomeComponent implements OnInit {
  firstFormGroup: any;
  hide = true;
  // user = {
  //   username: '',
  //   password: ''
  // }

  constructor(private router: Router, private welcomeService: WelcomeService, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  navigateToDestination(destination: String) {
    this.router.navigate([destination]);
  }

  login(e: any) {
    e.preventDefault()
    if (this.firstFormGroup.valid) {
      this.welcomeService.login(this.firstFormGroup.value).subscribe(result => {
        // console.log(result)
        if (result) {
          try {
            localStorage.setItem('user', JSON.stringify(result))
          } catch (e) {
            // console.log(e);
          }
          if (result.userType === 'customer') {
            this.router.navigate(['/customer/dashboard']);
          } else if (result.userType === 'pharmacy') {
            this.router.navigate(['/pharmacy/dashboard']);
          }
        }
      })
    }
  }
}
