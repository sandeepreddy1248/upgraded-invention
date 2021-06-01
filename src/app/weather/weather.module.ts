import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { SharedModule } from '../shared/shared.module';
import { WeatherByCityComponent } from './weather-by-city/weather-by-city.component';
import { WeatherAllCitiesComponent } from './weather-all-cities/weather-all-cities.component';
@NgModule({
  declarations: [WeatherComponent, WeatherByCityComponent, WeatherAllCitiesComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule,
  ],
  providers:[DatePipe]
})
export class WeatherModule { }
