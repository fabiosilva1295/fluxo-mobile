import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, filter, from, map, take } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ){}
  canLoad(): Observable<boolean>{
    return from(this.accountService.authenticated()).pipe(
      filter(val => val != null),
      take(1),
      map(val => {
        if(val) {
          this.router.navigateByUrl('/tabs', {replaceUrl: true});
          return false;
        }
          return true;
      })
    )
  }
  
}
