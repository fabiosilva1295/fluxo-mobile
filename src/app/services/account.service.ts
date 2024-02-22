import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthReponse, User } from '../models/user';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Storage } from '@ionic/storage';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private userService: UserService,
    private router: Router
  ) { }

  _is_authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  is_authenticated: Observable<boolean> = this._is_authenticated.asObservable();

  login(email: string, password: string) {
    return this.http.post<AuthReponse>(`${environment.api}/login`, { email, password }).pipe(
      tap(res => {
        this.storage.set('access_token', res.access_token);
        this.storage.set('refresh_token', res.refresh_token);

        return res
      })
    )
  }

  async authenticated() {
    const token = await this.storage.get('access_token')
    return token ? true : false
  }

  refreshToken() {
    return this.http.get(`${environment.api}/refresh`)
  }

  logout() {
    // remove user from local storage and set current user to null
    this.storage.remove('access_token');
    this.storage.remove('refresh_token');
    this.storage.remove('user');
    localStorage.clear();
    this.router.navigate(['/account/login']);
}


}
