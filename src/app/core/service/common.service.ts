import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  baseRef = environment.baseHref;
  appId = environment.appid;
  public emitCityData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  getWeather(city: any) {
    return this.http.get(
      this.baseRef + "weather?appid=" + this.appId + "&q=" +
      city
    );
  }

  getCitiWeatherInfo(city:any) {
    // return this.http.get(
    //   this.baseRef + "onecall?appid=" + this.appId + "&lat=" + lat + "&lon=" + lon + "&exclude=" + exclude
    // );
     return this.http.get(
      this.baseRef + "forecast?appid=" + this.appId + "&q=" +
      city
    );
  }

  cityInfo(city: any) {
    this.emitCityData.next(city)
  }



  //https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

}
