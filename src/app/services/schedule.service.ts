import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor() { }
  _changed_date_width_slide: ReplaySubject<String> = new ReplaySubject<string>();
  changed_date_width_slide$ = this._changed_date_width_slide.asObservable();


  changeDate(option: string) {
    this._changed_date_width_slide.next(option);
  }
}
