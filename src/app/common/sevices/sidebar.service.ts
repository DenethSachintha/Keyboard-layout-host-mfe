import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SidebarService {
  private visibleSubject = new BehaviorSubject<boolean>(true);
  visible$ = this.visibleSubject.asObservable();

  toggle() {
    this.visibleSubject.next(!this.visibleSubject.value);
  }

  open() {
    this.visibleSubject.next(true);
  }

  close() {
    this.visibleSubject.next(false);
  }
}
