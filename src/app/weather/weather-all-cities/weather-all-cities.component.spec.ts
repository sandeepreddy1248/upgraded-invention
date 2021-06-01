import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAllCitiesComponent } from './weather-all-cities.component';

describe('WeatherAllCitiesComponent', () => {
  let component: WeatherAllCitiesComponent;
  let fixture: ComponentFixture<WeatherAllCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherAllCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAllCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
