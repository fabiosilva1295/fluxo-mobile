import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'fluxo-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  @ViewChild('container') elementContainer!: ElementRef
  @ViewChildren('target') target!: QueryList<any>

  constructor(
    private scheduleService: ScheduleService
  ) { }


  cells: any[] = []
  date = new Date();

  scrollContainer: any;

  day: any;
  today: any;
  endDate: any;
  prevDate: any;

  months: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];
  dayOfWeek: string[] = [
    'Dom',
    'Seg',
    'Ter',
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
  ]

  currentMonth: any;
  currentYear: any;


  ngOnInit() {
    this.renderDate();
    this.scheduleService.changed_date_width_slide$.subscribe((option: string) =>  {
      this.moveDate(option)
    })
  }
  

  ngAfterViewInit() {
    this.navigateToToday()
  }



  navigateToToday() {
    const container: HTMLElement = this.elementContainer.nativeElement;
    const [target]: any = this.target.filter(el => el.nativeElement.classList.contains('today'))

    if(container && target) {
      setTimeout(() => {
        this.scroll(target.nativeElement, container)
      }, 100);
      
    }
  }
  renderDate(today?: Date) {
    this.cells = [];
    today ? this.date = new Date(today) : this.date = new Date();
    this.date.setDate(1);
    this.day = this.date.getDay();
    this.today = today ? new Date(today).getDate() : new Date().getDate();


    this.endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

    this.prevDate = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();;

    this.currentMonth = this.months[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    console.log(this.currentMonth, 'ultimo mes')

    let i: any;
    let j: any;

    for (j = 1; j <= this.endDate; j++) {
      let objData = {};
      let statusColor;

      let dayDate = new Date(this.currentYear, this.date.getMonth(), j);
 
      let currDate = today ? today : new Date();

      if (currDate.getDate() === dayDate.getDate() && currDate.getMonth() === dayDate.getMonth() && currDate.getFullYear() === dayDate.getFullYear()) {
        statusColor = true;
      } else {
        statusColor = false;
      }

      const dayOfWeekIndex = dayDate.getDay();
      const dayOfWeek = this.dayOfWeek[dayOfWeekIndex];

      objData = {localDate: dayDate, date: j, day: dayOfWeek, isToday: statusColor }
      this.cells.push(objData);
    }

    

  }

  moveDate(option: string) {
    if (option == 'prev') {
      this.date.setMonth(this.date.getMonth() - 1);
      this.renderDate(this.date);
      this.navigateToToday()
    } else {
      this.date.setMonth(this.date.getMonth() + 1);
      this.renderDate(this.date);
      this.navigateToToday()
    }
  }

  dateClicked(date: any) {
    this.renderDate(date);
  }

  scroll(el: HTMLElement, container: HTMLElement) {
    
    container.scrollLeft = el.offsetLeft - (container.offsetWidth / 2 - el.offsetWidth / 2);
  }
}
