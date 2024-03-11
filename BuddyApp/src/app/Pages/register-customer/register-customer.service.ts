import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SharedService} from "../../Services/shared-service.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterCustomerService {

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.sharedService.publicUrl + 'app_user/add', customer);
  }

  // getProvinces(): Observable<any> {
  //   return this.http.get<any>(this.sharedService.publicUrl + 'town/get_provinces');
  // }
  //
  // getDistricts(province: any): Observable<any> {
  //   return this.http.get<any>(this.sharedService.publicUrl + 'town/get_districts?province=' + province);
  // }

  // getTowns(): any {
  //   return this.sharedService.loadTowns();
  // }
}
