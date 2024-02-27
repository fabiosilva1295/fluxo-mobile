import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment'
import { EventComponent } from '../event/event.component';
import { ActionSheetButton } from '@ionic/angular';
import { IonNav } from '@ionic/angular/common';
import { Router } from '@angular/router';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'fluxo-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent  implements OnInit {
  

  constructor(
    private router: Router,
    private scheduleService: ScheduleService
  ) { }

  //swip navigation options 
  initial_screenX_touch: number;

  //Initial and final Day
  initial_hour_date: Date;
  final_hour_date: Date;

  //Intervals of query
  interval_query = 45;

  //Hour divide in long day
  hours: any[] = [];

  //teste show action sheet
  show: boolean = false;

  //actions buttons empty cell 
  actions_buttons_empty_cell: ActionSheetButton[] = [
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel'
      }

    }
  ]

  //actions buttons 
  actions_buttons: ActionSheetButton[] = [
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel'
      }

    },
    {
      text: 'Editar',
      handler: () => {
        this.router.navigate(['/tabs/schedule/12'])
        return true
      },
    },
    {
      text: 'Excluir',
      role: 'destructive',
      data: {
        action: 'delete'
      }
    }
  ]

  private initialPoint: { x: number, y: number };


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

     
      }
      hours.push(period);
      increment ++
      this.hours = hours;
    }
  }

  getNameSurname(name: string) {
    const names = name.split(' ')
    return `${names[0]} ${names[names.length - 1]}`
  }


  startGesture(event: TouchEvent): void {
    
    this.initialPoint = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }

  endGesture(event: TouchEvent): void {
    
    const finalPoint = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };

    const horizontalDifference = finalPoint.x - this.initialPoint.x;
    const verticalDifference = finalPoint.y - this.initialPoint.y;

    const horizontalThreshold = 170;
    const verticalThreshold = 30;

    if (Math.abs(horizontalDifference) > horizontalThreshold) {
      if (horizontalDifference < 0) {
        alert('Gesto para esquerda');
      } else {
        alert('Gesto para direita');
      }
    } else if (Math.abs(verticalDifference) > verticalThreshold) {
      if (verticalDifference < 0) {
        alert('Gesto para cima');
      } else {
        alert('Gesto para baixo');
      }
    } else {
      alert('Desistiu do gesto');
    }
  }

}
