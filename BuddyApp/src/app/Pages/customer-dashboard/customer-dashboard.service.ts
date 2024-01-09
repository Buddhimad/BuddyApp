import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../../Services/shared-service.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  getNoticesCustomer(customer: any): Observable<any> {
    return this.http.get<any>(this.sharedService.publicUrl + 'dashboard/get_notices_customer?customer=' + customer);
  }
}
