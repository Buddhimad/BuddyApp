import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../../common/shared-service.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountService {

  // localStorage = this.document.defaultView?.localStorage;

  constructor(@Inject(DOCUMENT) private document: Document,
              private http: HttpClient, private sharedService: SharedService) {
  }

  updateCustomer(customer: any): Observable<any> {
    // console.log(customer)
    return this.http.put<any>(this.sharedService.publicUrl + 'customer/update/' + customer.customerId, customer);
  }

  getCustomer(customer: any): Observable<any> {
    return this.http.get<any>(this.sharedService.publicUrl + 'customer/get/' + customer);
  }
}
