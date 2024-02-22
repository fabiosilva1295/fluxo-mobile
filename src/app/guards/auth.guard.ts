import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, filter, from, map, take } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private accountService: AccountService,
    private router: Router
  ){}

  canLoad(): Observable<boolean>{
    return from(this.accountService.authenticated()).pipe(
      filter(val => val != null),
      take(1),
      map(is_authenticated => {
        if(!is_authenticated) {
          this.router.navigateByUrl('/account/login');
          return false
        }
        return true
      })
    )
  } 
  
}
