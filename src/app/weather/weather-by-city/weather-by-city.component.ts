import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonService } from '../../../app/core/service/common.service';
import * as Highcharts from "highcharts";

@Component({
  selector: 'app-weather-by-city',
  templateUrl: './weather-by-city.component.html',
  styleUrls: ['./weather-by-city.component.scss']
})
export class WeatherByCityComponent implements OnInit, OnDestroy {

  cityData: any;
  name: any;
  days: any = [];

  // Data to fill Chart with
  private chartData: any = {
    temp: [],
    seaLevel: []
  };

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: any= {
    series: [

    ]
  };

  constructor(private route: ActivatedRoute,
    private commonService: CommonService,
    private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('name');
      if (this.name) {
        this.getCitiWeatherInfo()
      }

    })
  }

  getCitiWeatherInfo() {
    this.commonService.getCitiWeatherInfo(this.name).subscribe((data: any) => {
      if (data) {
        this.days = [];
        this.chartData.temp = [];
        this.chartData.seaLevel = [];
        this.cityData = data.list.filter((resp: any) => {
          const date = new Date(resp.dt_txt)
          if (date.getHours() == 9) {
            this.chartData.temp.push(Math.round(resp.main.temp));
            this.chartData.seaLevel.push(Math.round(resp.main.sea_level));
            const dateTime = new Date(Date.parse(resp.dt_txt));
            const dayName = this.datePipe.transform(dateTime, 'EEEE');
            this.days.push(dayName);
            return resp;
          }
        }
        );
          this.renderChart()

      }
    })
  }

  renderChart() {
    this.chartOptions = {
      series: [
            {
              type: "line",
              name:"temparature",
              data:  this.chartData.temp
            },
            {
              type: "line",
              name:"sealevel",
              data: this.chartData.seaLevel
            },
          ],
          xAxis: {
            categories: this.days
          },
          yAxis: {
            min: 0,
            title: {
              text: 'city weather'
            }
          },
          title: {
            text: 'Weather report for next 5 days'
          },
    };
     
  }



  ngOnDestroy(): void {
  }
}
