import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherByCityComponent } from './weather-by-city.component';

describe('WeatherByCityComponent', () => {
  let component: WeatherByCityComponent;
  let fixture: ComponentFixture<WeatherByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherByCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
