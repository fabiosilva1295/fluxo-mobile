import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'fluxo-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent  implements OnInit {

  constructor() { }

  //Initial and final Day
  initial_hour_date: Date;
  final_hour_date: Date;

  //Intervals of query
  interval_query = 45;

  //Hour divide in long day
  hours: any[] = [];

  //teste show action sheet
  show: boolean = false;

  component: EventComponent 



  ngOnInit() {
    this.initial_hour_date = moment().hours(9).minutes(0).seconds(0).toDate()
    this.final_hour_date = moment().hour(18).minutes(0).seconds(0).toDate();

    this.diveScheduleIntervals()
  }

  diveScheduleIntervals() {
    const hours = [];
    let increment= 0;


    while(this.initial_hour_date < this.final_hour_date) {
      const period = {}
      const initial_hour = moment(this.initial_hour_date).format('HH:mm');

      this.initial_hour_date = moment(this.initial_hour_date).add(this.interval_query, 'minutes').toDate();
      const final_hour = moment(this.initial_hour_date).format('HH:mm');

      // this.initial_hour_date = moment(this.initial_hour_date).add(5, 'minutes').toDate();

      period['initial_hour'] = initial_hour;
      period['final_hour'] = final_hour;

      if(increment == 0) {
        period['appointments'] = [
          {
            initial: period['initial_hour'],
            final: period['final_hour'],
            value: 100,
            competitor: {
              profile_image: 'pi pi-user',
              name: 'Fabio Francisco da Silva',
              email: 'fabio@email.com'
            },
            start: moment().hours(moment(initial_hour, 'HH:mm').get('hour')).minutes(moment(initial_hour, 'HH:mm').get('minute')).toDate()
          }
        ]

        console.log(period['queries'])
      }
      console.log(period)
      hours.push(period);
      increment ++
      this.hours = hours;
    }
  }

}
