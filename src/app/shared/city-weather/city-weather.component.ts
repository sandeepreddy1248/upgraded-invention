import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {
  @Input() city: any;
  @Output() emitGetCitiWeatherInfo = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getCitiWeatherInfo(){
    this.emitGetCitiWeatherInfo.next();
  }

  getDate(date :any){
    return new Date(date *1000)
  }
}
