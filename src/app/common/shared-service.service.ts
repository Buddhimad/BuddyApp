import {Inject, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  publicUrl = 'http://localhost:8080/api/buddy/'
  mqtt_url: '192.168.8.11'
  mqtt_port: 9001

  // sharedFunctionSubject = new Subject<void>();
  sideNavControlSubject = new Subject<void>();
  // routeControlSubject = new Subject<void>();

  // public sharedFunction$ = this.sharedFunctionSubject.asObservable();
  // public routeControlFunction = this.routeControlSubject.asObservable();
  // public sideNavControlFunction = this.sideNavControlSubject.asObservable();

  public notices = new Subject()

  navOpened = false

  // localStorage = this.document.defaultView?.localStorage;

  constructor(@Inject(DOCUMENT) private document: Document,
              private http: HttpClient, private router: Router) {
    // this.getNoticesCustomer()
  }

  public callChangeRouteFunction(route: any): void {
    this.router.navigate([route])
    // console.log(route);
    // this.routeControlSubject.next(route);
  }

  // public callSharedFunction(): void {
  //   this.sharedFunctionSubject.next();
  // }

  public callOpenSideNavFunction(type): void {
    this.sideNavControlSubject.next(type);
    // if (type === 'switch') {
    //   this.sideNavControlSubject.next();
    //   if (this.navOpened) {
    //     this.navOpened = false
    //   } else {
    //     this.navOpened = true
    //   }
    // } else if (type === 'close') {
    //   this.navOpened = false
    //   this.sideNavControlSubject.next();
    // }
  }

  townsSubject = new Subject<void>();

  getTowns(): Observable<any> {
    // let provincesObj: any = []
    // let districtsObj: any = []
    // let townsObj: any = []
    return new Observable(observer => {
      this.http.get<any>(this.publicUrl + 'town/get').subscribe((result) => {
        // console.log(result)
        // let provinces = result.filter((obj: any, index: any, arr: any) => {
        //   // Check if the index of the first occurrence of the object with the same 'name'
        //   // is the same as the current index
        //   // let ind=arr.findIndex((item: any) => item.district.province.provinceId === obj.district.province.provinceId);
        //   // console.log(ind)
        //   // return ind==index
        //   return arr.findIndex((item: any) => item.district.province.provinceId === obj.district.province.provinceId) === index
        // });

        // let provinces = new Set();
        // result.towns.forEach((town: any) => {
        //   provinces.add(town['province_name'])
        // })
        // this.provinces = provinces

        // let provincesArr = Array.from(provinces);
        // let districts = new Set();
        // console.log(provinces)
        // let towns: any[] = []
        // // provinces.forEach((province: any) => {
        // for (let i = 0; i < provinces.length; i++) {
        //   provinces[i] = {
        //     province_id: provinces[i].district.province.provinceId,
        //     province_name: provinces[i].district.province.name,
        //   }
        //   // result.towns.forEach((town: any) => {
        //   //   if (provinces[i] === town['province_name']) {
        //   //     districts.add(town['district_name'])
        //   //   }
        //   // })
        //   let districts = result.filter((obj: any, index: any, arr: any) => {
        //     return arr.findIndex((item: any) => item.district.province.provinceId === obj.district.province.provinceId && provinces[i].province_name === obj.district.province.name) === index;
        //   });
        //   //
        //   //
        //   //   // let districtsArr = Array.from(districts)
        //   //
        //   for (let j = 0; j < districts.length; j++) {
        //     //     // districts[i] = {
        //     //     //   district_id: districts[i].district_id,
        //     //     //   district_name: districts[i].district_name,
        //     //     // }
        //     //     // let towns = result.towns.filter((obj: any, index: any, arr: any) => {
        //     //     //   return arr.findIndex((item: any) => item.district_id === obj.district_id && districts[i].district_name === obj.district_name) === index;
        //     //     // });
        //     //     result.forEach((town: any) => {
        //     //       if (districts[j].district_id === town['district_id']) {
        //     //         towns.push({
        //     //           town_id: town.town_id,
        //     //           town_name: town.town_name
        //     //         })
        //     //       }
        //     //     })
        //     districts[j] = {
        //       district: {
        //         district_id: districts[j].districtId,
        //         district_name: districts[j].name,
        //       },
        //       towns: towns
        //     }
        //   }
        //   //
        //   provinces[i] = {
        //     province: provinces[i],
        //     districts: districts
        //     // }
        //   }
        // }
        // // console.log(provinces)
        observer.next(result)
        // // this.townsSubject.next(provinces)
        // // return provinces
        // console.log(provinces)
      })
    })
  }

  getUser(): Observable<any> {
    // let provincesObj: any = []
    // let districtsObj: any = []
    // let townsObj: any = []
    // console.log(this.publicUrl + 'app_user/get_user?user_id=' + JSON.parse(localStorage.getItem('user')).user_id)

    return new Observable(observer => {
      this.http.get<any>(this.publicUrl + 'app_user/get_user/' + this.getUserIdByLS()).subscribe((result) => {
        observer.next(result.app_user)
      })
    })

  }

  getDistrictsForProvince(province, formGroup) {
    if (province !== undefined && province !== null) {
      formGroup.controls.district.setValue('');
      formGroup.controls.town.setValue('');
      return province.districts
    }
  }

  getTownsForDistrict(district, formGroup) {
    // this.registerCustomerS.getTowns(district).subscribe(result => {
    if (district !== undefined && district !== null) {
      formGroup.controls.town.setValue('');
      return district.towns
    }
    // })
  }

  getUserIdByLS() {
    try {
      return JSON.parse(localStorage.getItem('user')).id
    } catch (e) {
      // console.log(e);
    }
  }

  getUserByLS() {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch (e) {
      // console.log(e);
    }
  }

  getNoticesCustomer() {
    // this.http.get<any>(this.publicUrl + 'notice/get_notices_customer/' + this.getUserIdByLS()).subscribe(result => {
    //   this.notices.next(result)
    // })
    return this.http.get<any>(this.publicUrl + 'notice/get_notices_customer/' + this.getUserIdByLS())
  }
}
