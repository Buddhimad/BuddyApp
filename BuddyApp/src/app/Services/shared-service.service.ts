import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedFunctionSubject = new Subject<void>();
  private routeControlSubject=new Subject<void>();

  public sharedFunction$ = this.sharedFunctionSubject.asObservable();
  public routeControlFunction=this.routeControlSubject.asObservable();

  public callChangeRouteFunction(route:any):void{
    this.routeControlSubject.next(route);
  }

  public callSharedFunction(): void {
    this.sharedFunctionSubject.next();
  }
}
