import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountService } from './services/account.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { Storage } from '@ionic/storage';
import { RequestInterceptor } from './interceptors/request-dev-environment.interceptor';
import { JwtInterceptors } from './interceptors/jwt.interceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      mode: 'ios',
    }), 
    RouterModule.forRoot([]),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptors, multi: true },
    AccountService,
    Storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
