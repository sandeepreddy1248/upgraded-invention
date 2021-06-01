angular.module('app')
    .component('cityweather', {
        templateUrl: 'app/templates/citywheather.html',
        bindings: {
            city: '<',
        },
        controller: 'cityweatherController'
    })
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        // We must whitelist the JSONP endpoint that we are using to show that we trust it
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://api.openweathermap.org/**'
        ]);
    }])
    .controller('cityweatherController', ['$scope', '$http', '$templateCache',
      function ($scope, $http, $templateCache) {

        var KELVIN_TO_CENTIGRADE = Number(273.15);
        var eg_token = '3d8b309701a13f65b660fa2c64cdc517';
        var super_token = '2fbc589613a9bd16a18f1417736d64c6305';
        var OATH_TOKEN = super_token.substring(super_token, super_token.length - 3);

        $scope.city = this.city;
        $scope.method = 'JSONP';
        $scope.expandedView = 'off';

        function getAverageTemp(min, max) {

          var minTemp = 0;
          var maxTemp = 0;

          if (min === undefined || max == undefined) {
            return -1 * KELVIN_TO_CENTIGRADE;
          }

          var minTemp = parseInt(min) || 0;
          var maxTemp = parseInt(max) || 0;

          return ((minTemp + maxTemp) / 2) - KELVIN_TO_CENTIGRADE;
        }

        function getNextHours(hour) {
          return [{ 'hour': hour + ':00 pm', 'temp': 'no-data' }];
        }

        function getCityWeather() {
            $scope.url = "http://api.openweathermap.org/data/2.5/weather?id=" + $scope.city.key + "&appid=" + OATH_TOKEN + "&callback=JSON_CALLBACK";
            
            $scope.code = null;
            $scope.response = null;
            
            $http({ method: $scope.method, url: $scope.url, cache: $templateCache }).
            then(function (response) {

              $scope.status = response.status;
              $scope.data = response.data;

              if ($scope.data.dt === undefined || $scope.data.main === undefined || $scope.city.wind === undefined) {
                $scope.city.wind = 'no-data';
                $scope.city.temp = 'no-data';
                $scope.city.dataAsOf = new Date();
                return;
              }

              $scope.city.wind = $scope.data.wind;
              $scope.city.dataAsOf = new Date(Number($scope.data.dt) * 1000);

              $scope.city.temp = getAverageTemp($scope.data.main.temp_min, $scope.data.main.temp_max);
              $scope.city.forecast = getNextHours($scope.city.dataAsOf.getHours());

              if ($scope.city.temp == KELVIN_TO_CENTIGRADE)
                  $scope.city.temp = $scope.data.main.temp;

            }, function (response) {
                $scope.data = response.data || 'Request failed';
                $scope.status = response.status;
            });

        }

        $scope.getForecast = function () {

          if ($scope.expandedView === 'on') {
            $scope.expandedView = 'off';
            return;
          } else {
            $scope.expandedView = 'on';
          }

          $scope.url = "http://api.openweathermap.org/data/2.5/forecast?id=" + $scope.city.key + "&appid=" + OATH_TOKEN + "&callback=JSON_CALLBACK";

          $scope.code = null;
          $scope.forecast = null;
          
          $http({ method: $scope.method, url: $scope.url, cache: $templateCache }).
          then(function (response) {

            $scope.status = response.status;
            $scope.forecast = response.data;
            $scope.city.forecast = [];

            if ($scope.forecast === undefined || $scope.forecast.list === undefined) {
              $scope.city.forecast = [{ 'hour': new Date(), 'temp': 'no-data' }];
              return;
            }

            var forecastTimes = $scope.forecast.list;
            var forecastListLength = 5;
            var forecastList = [];
            forecastTimes.splice(forecastListLength, forecastTimes.length - forecastListLength);

            forecastTimes.forEach(function(forecastItem) {

              if (forecastItem === undefined || forecastItem.dt_txt === undefined) return;

              var item = {'hour': '', 'temp':'no-data'};
              var forecastDate = forecastItem.dt_txt;

              item.hour = new Date(forecastDate);

              if (forecastItem.main === undefined || forecastItem.main.temp == undefined) return;

              item.temp = Number(forecastItem.main.temp) - KELVIN_TO_CENTIGRADE;
              forecastList.push(item);
            });

            $scope.city.forecast = forecastList;
          }, function (response) {
            $scope.forecast = response.data || 'Request failed';
            $scope.status = response.status;
            $scope.city.forecast[{ 'hour': new Date(), 'temp': 'no-data' }];
          });
        }

        getCityWeather();

      }]);