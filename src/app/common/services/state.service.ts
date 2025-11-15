import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private stateSubject = new BehaviorSubject<any>(null);
  layoutState$ = this.stateSubject.asObservable();

  updateState(value: any) {
    this.stateSubject.next(value);
  }
}
