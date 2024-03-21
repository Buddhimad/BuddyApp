import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../../common/shared-service.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerDashboardService {

  constructor(private http: HttpClient, private sharedService: SharedService) {
  }


}
