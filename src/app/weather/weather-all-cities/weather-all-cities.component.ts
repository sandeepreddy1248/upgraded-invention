import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../core/service/common.service';

@Component({
  selector: 'app-weather-all-cities',
  templateUrl: './weather-all-cities.component.html',
  styleUrls: ['./weather-all-cities.component.scss']
})
export class WeatherAllCitiesComponent implements OnInit {

  citiesList = ["London", "Amsterdam", "Madrid", "Berlin", "Warsaw"];
  cityData: any = [];
  constructor(private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.getCitiesWeatherInfo();
  }

  getCitiesWeatherInfo() {
    let tempCityList: any = [];
    this.citiesList.forEach(city => {
      this.commonService.getWeather(city)
        .subscribe((data: any) => {
          tempCityList.push(data);
          const lastItem = this.citiesList[this.citiesList.length - 1] === city;
          if (lastItem) {
            this.cityData = tempCityList;
          }
        }
        );
    })
  }

  //getCitiWeatherInfo
  getCitiWeatherInfo(city: any) {
    //this.commonService.cityInfo(city);
    this.router.navigate(['weatherbycity/'+city.name]);
  }
}
