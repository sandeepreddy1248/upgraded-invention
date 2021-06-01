import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { RoundPipe } from './round.pipe';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    CityWeatherComponent,
    RoundPipe
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ],
  exports: [
    CityWeatherComponent,
    HighchartsChartModule,
    RoundPipe
  ]
})
export class SharedModule { }
