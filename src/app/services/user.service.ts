import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) { }

  _current_user: BehaviorSubject<any> = new BehaviorSubject(undefined)
  current_user$: Observable<any> = this._current_user.asObservable();

  setCurrentUser(user: any) {
    this._current_user.next(user)
  }

  async checkHasUser() {
    const user = await this.storage.get('user')
    user ? this.setCurrentUser(user) : this.setCurrentUser(false)
    console.log(user)
    return user ? user : false
  }

  getPersonalData() {
    return this.http.get(environment.api + '/user/personal-data');
  }

  find_me() {
    return this.http.get(`${environment.api}/me`)
  }


}
