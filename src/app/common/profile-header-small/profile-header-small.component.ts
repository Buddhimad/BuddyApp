import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-profile-header-small',
  templateUrl: './profile-header-small.component.html',
  styleUrls: ['./profile-header-small.component.css']
})
export class ProfileHeaderSmallComponent {

  @Input() appUser
  @Output() viewCustomerFunc = new EventEmitter()

  viewCustomer() {
    this.viewCustomerFunc.emit(true)
  }
}
