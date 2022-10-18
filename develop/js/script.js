const searchButton = document.getElementById("searchInput")
const apiKey = '&appid=a479e1e1c0545530bb1dd66a94ee949b'
const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='
const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?'

var city = document.querySelector("#city_name");
var temp = document.querySelector("#temp");
var humidity = document.querySelector("#humidity");
var wind = document.querySelector("#wind");


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

function getForecast(url){
    fetch(url)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            var temp = (data.list[0].main.temp);
            var fahrenheit = 1.8*(temp-273) + 32;
            var humidity = (data.list[0].main.humidity);
            var wind = (data.list[0].wind.speed);
            var weather = [fahrenheit, humidity, wind];
            return weather
        })
        .then(function(data){
            temp.innerHTML = data[0];
            humidity.innerHTML = data[1] + " %";
            wind.innerHTML = data[2] + " MPH";
        })
}


function getWeather(lat, lon) {
    var url = forecastUrl + 'lat=' + lat + '&lon=' + lon + '&limit=1' + '&appid=' + 'c48964af8db3fee241118134e5122c3f'
    getForecast(url)
}

// handle forecast url
function getGeoUrl(cityName){
    var url = geoUrl + cityName + '&limit=1' + apiKey;
    getGeocoding(url)
}

// handle geocode url
function getGeoUrl(cityName){
    var url = geoUrl + cityName + '&limit=1' + '&appid=a479e1e1c0545530bb1dd66a94ee949b';
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