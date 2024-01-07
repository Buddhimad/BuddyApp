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
    return this.http.post<any>(this.sharedService.publicUrl + 'app_user/signup', customer);
  }

  getProvinces(): Observable<any> {
    return this.http.get<any>(this.sharedService.publicUrl + 'town/get_provinces');
  }

  getDistricts(province: any): Observable<any> {
    return this.http.get<any>(this.sharedService.publicUrl + 'town/get_districts?province=' + province);
  }

  getTowns(district: any): Observable<any> {
    return this.http.get<any>(this.sharedService.publicUrl + 'town/get_towns?district=' + district);
  }
}
