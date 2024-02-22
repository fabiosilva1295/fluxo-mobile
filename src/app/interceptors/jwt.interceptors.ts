import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable, catchError, combineLatest, combineLatestWith, from, switchMap, throwError } from "rxjs";
import { AccountService } from "../services/account.service";

@Injectable() 
export class JwtInterceptors implements HttpInterceptor {
    constructor(
        private storage: Storage,
        private accountService: AccountService,
    ){}

    isRefreshing: boolean = false;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(request.url.includes('refresh')) {
            return from(this.storage.get('refresh_token')).pipe(
                switchMap(token => {
                    if(!token) return next.handle(request);
                    request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
                    return next.handle(request).pipe(
                        catchError((error: string) => {
                            return this.refreshToken(next, request)
                        })
                    );
                })
            );
        }
       
        return from(this.storage.get('access_token')).pipe(
            switchMap(token => {
                if(!token) return next.handle(request);
                request = request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
                return next.handle(request).pipe(
                    catchError((error: string) => {
                        return this.refreshToken(next, request)
                    })
                );
            })
        );    
    }

    refreshToken(next: HttpHandler, request: HttpRequest<any>) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;

            return from(this.storage.get('refresh_token')).pipe(
                switchMap((refresh_token: any) => {
                    if(refresh_token) {
                        return this.accountService.refreshToken().pipe(
                            switchMap((res: any) => {
                                this.isRefreshing = false;
                                this.storage.set('access_token', res.access_token)
                                this.storage.set('refresh_token', res.refresh_token)
        
                                request = request.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${res.access_token}`
                                    }
                                })
        
                                return next.handle(request)
                            }),
                            catchError((error: string) => {
                                this.isRefreshing = false;
                                if(error) {
                                    this.accountService.logout();
                                }
                                return throwError(() => error)
                            })
                        )
                    }else {
                        this.isRefreshing = false;
        
                        return next.handle(request)
                    }
                })
            )

            const refresh_token = from(this.storage.get('refresh_token'));
            console.log(refresh_token, 'refresh')
            if (refresh_token) {
                return this.accountService.refreshToken().pipe(
                    switchMap((res: any) => {   
                        this.isRefreshing = false;
                        this.storage.set('access_token', res.access_token)
                        this.storage.set('refresh_token', res.refresh_token)

                        request = request.clone({
                            setHeaders: {
                                Authorization: `Bearer ${res.access_token}`
                            }
                        })

                        return next.handle(request)
                    }),
                    catchError((error: string) => {
                        this.isRefreshing = false;
                        if(error == 'Forbidden') {
                            this.accountService.logout();
                        }
                        return throwError(() => error)
                    }))
            } else {
                this.isRefreshing = false;

                return next.handle(request)
            }
        }

        return next.handle(request)
    }
}