import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  publicUrl = 'http://localhost:8000/api/'

  private sharedFunctionSubject = new Subject<void>();
  private sideNavControlSubject=new Subject<void>();
  private routeControlSubject = new Subject<void>();

  public sharedFunction$ = this.sharedFunctionSubject.asObservable();
  public routeControlFunction = this.routeControlSubject.asObservable();
  public sideNavControlFunction=this.sideNavControlSubject.asObservable();

  public callChangeRouteFunction(route: any): void {
    this.routeControlSubject.next(route);
  }

  public callSharedFunction(): void {
    this.sharedFunctionSubject.next();
  }

  public callOpenSideNavFunction(account_type:any):void{
    this.sideNavControlSubject.next(account_type);
  }
}
