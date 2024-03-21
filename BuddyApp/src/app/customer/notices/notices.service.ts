import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../../common/shared-service.service";

@Injectable({
  providedIn: 'root'
})
export class NoticesService {



  constructor(private http: HttpClient, private sharedService: SharedService) {
  }


}
