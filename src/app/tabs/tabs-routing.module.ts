import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { EventComponent } from '../pages/schedule/event/event.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '', component: TabsPage, children: [
      { 
        path: 'home', 
        children: [{
          path: '',
          loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
        }]
      
      },
      { 
        path: 'schedule', 
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/schedule/schedule.module').then( m => m.SchedulePageModule),
          },
          {
            path: ':id',
            component: EventComponent,
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
