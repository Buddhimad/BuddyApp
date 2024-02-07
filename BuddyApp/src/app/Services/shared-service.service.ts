import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  publicUrl = 'http://localhost:8000/api/'

  private sharedFunctionSubject = new Subject<void>();
  private sideNavControlSubject = new Subject<void>();
  private routeControlSubject = new Subject<void>();

  public sharedFunction$ = this.sharedFunctionSubject.asObservable();
  public routeControlFunction = this.routeControlSubject.asObservable();
  public sideNavControlFunction = this.sideNavControlSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public callChangeRouteFunction(route: any): void {
    console.log(route);
    this.routeControlSubject.next(route);
  }

  public callSharedFunction(): void {
    this.sharedFunctionSubject.next();
  }

  public callOpenSideNavFunction(account_type: any): void {
    this.sideNavControlSubject.next(account_type);
  }

  townsSubject = new Subject<void>();

  getTowns(): Observable<any> {
    // let provincesObj: any = []
    // let districtsObj: any = []
    // let townsObj: any = []
    return new Observable(observer => {
      this.http.get<any>(this.publicUrl + 'town/get_towns').subscribe((result) => {
        // console.log(towns)
        let provinces = result.towns.filter((obj: any, index: any, arr: any) => {
          // Check if the index of the first occurrence of the object with the same 'name'
          // is the same as the current index
          return arr.findIndex((item: any) => item.province_id === obj.province_id) === index;
        });

        // let provinces = new Set();
        // result.towns.forEach((town: any) => {
        //   provinces.add(town['province_name'])
        // })
        // this.provinces = provinces

        // let provincesArr = Array.from(provinces);
        // let districts = new Set();
        let towns: any[] = []
        // provinces.forEach((province: any) => {
        for (let i = 0; i < provinces.length; i++) {
          provinces[i] = {
            province_id: provinces[i].province_id,
            province_name: provinces[i].province_name,
          }
          // result.towns.forEach((town: any) => {
          //   if (provinces[i] === town['province_name']) {
          //     districts.add(town['district_name'])
          //   }
          // })
          let districts = result.towns.filter((obj: any, index: any, arr: any) => {
            return arr.findIndex((item: any) => item.province_id === obj.province_id && provinces[i].province_name === obj.province_name) === index;
          });


          // let districtsArr = Array.from(districts)

          for (let j = 0; j < districts.length; j++) {
            // districts[i] = {
            //   district_id: districts[i].district_id,
            //   district_name: districts[i].district_name,
            // }
            // let towns = result.towns.filter((obj: any, index: any, arr: any) => {
            //   return arr.findIndex((item: any) => item.district_id === obj.district_id && districts[i].district_name === obj.district_name) === index;
            // });
            result.towns.forEach((town: any) => {
              if (districts[j].district_id === town['district_id']) {
                towns.push({
                  town_id: town.town_id,
                  town_name: town.town_name
                })
              }
            })
            districts[j] = {
              district: {
                district_id: districts[j].district_id,
                district_name: districts[j].district_name,
              },
              towns: towns
            }
          }

          provinces[i] = {
            province: provinces[i],
            districts: districts
          }
        }
        // console.log(provinces)
        observer.next(provinces)
        // this.townsSubject.next(provinces)
        // return provinces
      })
    })
  }

  getUser(): Observable<any> {
    // let provincesObj: any = []
    // let districtsObj: any = []
    // let townsObj: any = []
    // console.log(this.publicUrl + 'app_user/get_user?user_id=' + JSON.parse(localStorage.getItem('user')).user_id)
    return new Observable(observer => {
      this.http.get<any>(this.publicUrl + 'app_user/get_user?user_id=' + JSON.parse(localStorage.getItem('user')).user_id).subscribe((result) => {
        observer.next(result.app_user)
      })
    })
  }
}
