import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private showLoaderSubject = new BehaviorSubject<boolean>(false);

  showLoader$ = this.showLoaderSubject.asObservable();

  showLoader() {
    this.showLoaderSubject.next(true);
  }

  hideLoader() {
    this.showLoaderSubject.next(false);
  }
}
