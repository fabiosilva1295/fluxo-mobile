import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulePageRoutingModule } from './schedule-routing.module';

import { SchedulePage } from './schedule.page';
import { CalendarComponent } from './calendar/calendar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { EventComponent } from './event/event.component';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import * as hammer from  'hammerjs'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HammerModule,
    IonicModule,
    SchedulePageRoutingModule,
    ButtonModule,
    DividerModule,
    AvatarModule
  ],
  declarations: [
    SchedulePage,
    CalendarComponent,
    TimelineComponent,
    EventComponent
  ],
  providers: [
    
  ]
})
export class SchedulePageModule {}
