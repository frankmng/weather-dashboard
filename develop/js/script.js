const searchButton = document.getElementById("searchInput")
const apiKey = '&appid=a479e1e1c0545530bb1dd66a94ee949b'
const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
// const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
const currentUrl = 'http://api.openweathermap.org/data/2.5/weather?';

var city = document.querySelector("#city_name");
var temp = document.querySelector("#temp");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("#wind");

// variables for current day and next 5 days
var currentDate = document.querySelector("#date");
var secondDay = document.querySelector("#secondDay");
var thirdDay = document.querySelector("#thirdDay");
var fourthDay = document.querySelector("#fourthDay");
var fifthDay = document.querySelector("#fifthDay");
var sixthDay = document.querySelector("#sixthDay");

// elements for 5 day forecast temperature
var secondDayTemp = document.querySelector("#secondDayTemp");
var secondDayWind = document.querySelector("#secondDayWind");
var secondDayHumidity = document.querySelector("#secondDayHumidity");

var thirdDayTemp = document.querySelector("#thirdDayTemp");
var thirdDayWind = document.querySelector("#thirdDayWind");
var thirdDayHumidity = document.querySelector("#thirdDayHumidity");

var fourthDayTemp = document.querySelector("#fourthDayTemp");
var fourthDayWind = document.querySelector("#fourthDayWind");
var fourthDayHumidity = document.querySelector("#fourthDayHumidity");

var fifthDayTemp = document.querySelector("#fifthDayTemp");
var fifthDayWind = document.querySelector("#fifthDayWind");
var fifthDayHumidity = document.querySelector("#fifthDayHumidity");

var sixthDayTemp = document.querySelector("#sixthDayTemp");
var sixthDayWind = document.querySelector("#sixthDayWind");
var sixthDayHumidity = document.querySelector("#sixthDayHumidity");


var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
currentDate.innerHTML =  '(' + today + ')';

var date2 = new Date();
var dd2 = String(date2.getDate()+1).padStart(2, '0');
date2 = mm + '/' + dd2 + '/' + yyyy;
secondDay.innerHTML = date2

var date3 = new Date();
var dd3 = String(date3.getDate()+2).padStart(2, '0');
date3 = mm + '/' + dd3 + '/' + yyyy;
thirdDay.innerHTML = date3

var date4 = new Date();
var dd4 = String(date4.getDate()+3).padStart(2, '0');
date4 = mm + '/' + dd4 + '/' + yyyy;
fourthDay.innerHTML = date4

var date5 = new Date();
var dd5 = String(date5.getDate()+4).padStart(2, '0');
date5 = mm + '/' + dd5 + '/' + yyyy;
fifthDay.innerHTML = date5

var date6 = new Date();
var dd6 = String(date6.getDate()+5).padStart(2, '0');
date6 = mm + '/' + dd6 + '/' + yyyy;
sixthDay.innerHTML = date6



// handle getting coordinates from city
function getGeocoding(url){
    fetch(url)
        .then(function (response){
            // console.log(response.json());
            return response.json();
        })
        .then(function(data) {
            for (var i = 0; i < data.length; i++){
                console.log(data[i].name,data[i].lat,data[i].lon)
                console.log(data[i])
                city.innerHTML = data[i].name
                return [data[i].lat, data[i].lon]
            }
        })
        .then(function (data){
            var lat = data[0];
            var lon = data[1];
            getWeather(lat,lon)
        })
}

// handle current day weather data
function getCurrentWeather(url){
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            var temp = (1.8*((data.main.temp)-273) + 32).toFixed(2);
            var humidity = (data.main.humidity);
            var wind = (data.wind.speed);
            var weather = [temp, humidity, wind];
            return weather;
        })
        .then(function(data){
            temp.innerHTML = data[0] + "°F";
            humidity.innerHTML = data[1] + " %";
            wind.innerHTML = data[2] + " MPH";
        })
}
// handle 5 day forecast weather data
function getForecast(url){
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            var temp1 = (1.8*((data.list[0].main.temp)-273) + 32).toFixed(2);
            var humidity1 = (data.list[0].main.humidity);
            var wind1 = (data.list[0].wind.speed);
            var weather1 = [temp1, humidity1, wind1];
            var temp2 = (1.8*((data.list[6].main.temp)-273) + 32).toFixed(2);
            var humidity2 = (data.list[6].main.humidity);
            var wind2 = (data.list[6].wind.speed);
            var weather2 = [temp2, humidity2, wind2];
            var temp3 = (1.8*((data.list[14].main.temp)-273) + 32).toFixed(2);
            var humidity3 = (data.list[14].main.humidity);
            var wind3 = (data.list[14].wind.speed);
            var weather3 = [temp3, humidity3, wind3];
            var temp4 = (1.8*((data.list[22].main.temp)-273) + 32).toFixed(2);
            var humidity4 = (data.list[22].main.humidity);
            var wind4 = (data.list[22].wind.speed);
            var weather4 = [temp4, humidity4, wind4];
            var temp5 = (1.8*((data.list[30].main.temp)-273) + 32).toFixed(2);
            var humidity5 = (data.list[30].main.humidity);
            var wind5 = (data.list[30].wind.speed);
            var weather5 = [temp5, humidity5, wind5];
            var weatherArr = [weather1, weather2, weather3, weather4, weather5]
            return weatherArr;
        })
        .then(function(data){
            secondDayTemp.innerHTML = data[0][0] + "°F";
            secondDayHumidity.innerHTML = data[0][1] + " %";
            secondDayWind.innerHTML = data[0][2] + " MPH";

            thirdDayTemp.innerHTML = data[1][0] + "°F";
            thirdDayHumidity.innerHTML = data[1][1] + " %";
            thirdDayWind.innerHTML = data[1][2] + " MPH";

            fourthDayTemp.innerHTML = data[2][0] + "°F";
            fourthDayHumidity.innerHTML = data[2][1] + " %";
            fourthDayWind.innerHTML = data[2][2] + " MPH";

            fifthDayTemp.innerHTML = data[3][0] + "°F";
            fifthDayHumidity.innerHTML = data[3][1] + " %";
            fifthDayWind.innerHTML = data[3][2] + " MPH";

            sixthDayTemp.innerHTML = data[4][0] + "°F";
            sixthDayHumidity.innerHTML = data[4][1] + " %";
            sixthDayWind.innerHTML = data[4][2] + " MPH";
        })

}


function getWeather(lat, lon) {
    var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?' + 'lat=' + lat + '&lon=' + lon + '&appid=' + 'c48964af8db3fee241118134e5122c3f'
    var cUrl = currentUrl + 'lat=' + lat + '&lon=' + lon  + '&appid=' + 'c48964af8db3fee241118134e5122c3f'
    getCurrentWeather(cUrl)
    getForecast(forecastUrl)
}

// handle forecast url
function getGeoUrl(cityName){
    var url = geoUrl + cityName + '&limit=1' + apiKey;
    getGeocoding(url)
}


// handle user input on button click
searchButton.addEventListener("click", () => {
    var input = document.getElementById("searchBar").value;
    getGeoUrl(input);
  });

// handle user input on keyboard 'enter'
searchBar.addEventListener("keydown", () => {
      if (event.key === 'Enter') {
        var input = document.getElementById("searchBar").value;
        getGeoUrl(input);
      }
  });