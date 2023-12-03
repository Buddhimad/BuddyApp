import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private sharedFunctionSubject = new Subject<void>();

  public sharedFunction$ = this.sharedFunctionSubject.asObservable();

  public callSharedFunction(): void {
    this.sharedFunctionSubject.next();
  }
}
