const searchButton = document.getElementById("searchInput")
var city = document.querySelector("#city_name")
var url = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.714224&lon=-73.961452&appid=a479e1e1c0545530bb1dd66a94ee949b'
var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='


// var mainURL = geoUrl + cityName + '&limit=1' + '&appid=a479e1e1c0545530bb1dd66a94ee949b'

// var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=${document.getElementById("dateUserInput").value}&limit=1&appid=a479e1e1c0545530bb1dd66a94ee949b'

// var url = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
// var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'


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
            }
        })
}

// handle url upon user input
function getUrl(cityName){
    var url = geoUrl + cityName + '&limit=1' + '&appid=a479e1e1c0545530bb1dd66a94ee949b';
    getGeocoding(url)
}

// handle search button on event click
searchButton.addEventListener("click", e => {
    var input = document.getElementById("searchBar").value;
    getUrl(input);
  });


  