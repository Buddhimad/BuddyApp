import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../shared-service.service";

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }

  login(customer: any): Observable<any> {
    return this.http.post<any>(this.sharedService.publicUrl + 'app_user/login', customer);
  }
}
