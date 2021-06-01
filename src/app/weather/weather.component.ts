import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "../core/service/common.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  ngOnInit() {
  }

}
