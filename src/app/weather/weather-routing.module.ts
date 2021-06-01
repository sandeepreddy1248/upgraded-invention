import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherAllCitiesComponent } from './weather-all-cities/weather-all-cities.component';
import { WeatherByCityComponent } from './weather-by-city/weather-by-city.component';
import { WeatherComponent } from './weather.component';

const routes: Routes = [
  {
    path: '', component: WeatherComponent,
    children: [
      { path: '', component: WeatherAllCitiesComponent },
      { path: 'weatherbycity/:name', component: WeatherByCityComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
