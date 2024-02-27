import { Component, OnInit } from '@angular/core';
import { TabbarService } from 'src/app/services/tabbar.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent  implements OnInit {

  constructor(
    private tabbarService: TabbarService
  ) { }

  ngOnInit() {
    this.tabbarService.hide()
  }

  onLeave() {
    this.tabbarService.show()
  }

}
