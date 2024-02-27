import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabbarService {

  constructor() { }

  hide() {
    const tabbar = <HTMLElement>document.querySelector('ion-tab-bar');
    tabbar.classList.toggle('hide');
    setTimeout(() => {
      tabbar.style.display = 'none'
    }, 100);
  }

  show() {
    const tabbar = <HTMLElement>document.querySelector('ion-tab-bar');
    tabbar.style.display = 'flex'
    tabbar.classList.toggle('hide');
  }
}
