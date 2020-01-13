import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsPieComponent } from '../../@theme/components/echarts-pie.component';
import { BubbleMapComponent } from '../../@theme/components/bubble/bubble-map.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
    EchartsPieComponent,
    BubbleMapComponent
  ],
})
export class DashboardModule { }
