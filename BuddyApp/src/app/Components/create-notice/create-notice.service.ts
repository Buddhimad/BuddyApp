import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {SharedService} from "../../Services/shared-service.service";

@Injectable({
  providedIn: 'root'
})
export class CreateNoticeService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  addNotice(notice: any): Observable<any> {
    // console.log(notice)
    return this.http.post<any>(this.sharedService.publicUrl + 'notice/add_notice_customer', notice);
  }
  // getTowns(): any {
  //   return this.sharedService.loadTowns();
  // }

  // upload(file: File): Observable<HttpEvent<any>> {
  //   // const formData: FormData = new FormData();
  //   //
  //   // formData.append('file', file);
  //   //
  //   // const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //   //   reportProgress: true,
  //   //   responseType: 'json'
  //   // });
  //   //
  //   // return this.http.request(req);
  // }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }
  //
  // addCustomer(customer: any): Observable<any> {
  //   return this.http.post<any>(this.sharedService.publicUrl + 'app_user/signup', customer);
  // }


}
