const city = document.getElementById("city");
const weather = document.getElementById("weather");
const error = document.getElementById("error");

function checkEnter(event){
    if(event.key === "Enter"){
        searchWeather();
    }
}
async function searchWeather() {
    let name = city.value.trim();
    if (name===""){
        error.textContent = "Enter a place first";
        return;
    }
    error.textContent="";
    weather.innerHTML = "<p class='muted'>Searching...</p>";
    try{
        let response = await fetch("https://geocoding-api.open-meteo.com/v1/search"+"?name="+encodeURIComponent(name)+"&count=1&language=en&format=json");
        let data = await response.json();
        if(!data.results){
            throw new Error();
        }
        let place = data.results[0];
        getWeather(place.latitude,place.longitude,place.name,place.country);
    }catch{
        weather.innerHTML="";
        error.textContent="Place not found";
    }
}
async function getWeather(lat, lon, name, country) {
    try{
        let url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + lat +
            "&longitude=" + lon +
            "&current=" +
            "temperature_2m," +
            "relative_humidity_2m," +
            "apparent_temperature," +
            "weather_code," +
            "wind_speed_10m" +
            "&daily=" +
            "weather_code," +
            "temperature_2m_max," +
            "temperature_2m_min," +
            "precipitation_probability_max" +
            "&timezone=auto" +
            "&forecast_days=5";
            let response = await fetch(url);
            let data = await response.json();
            showWeather(name,country,data);
    }catch{
        weather.innerHTML="";
        error.textContent="Could not load data";
    }
    
}
function showWeather(name,country,data){
    let current = data.current;
    let daily = data.daily;
    let forecast = "";
    for(let i=0;i<daily.time.length;i++){
        let day = new Date(daily.time[i]+"T12:00:00").toLocaleDateString("en",{weekend:"short"});
        forecast += `
        <div>

        <strong>${day}</strong>

        <p class="weather-icon">${getIcon(daily.weather_code[i])}</p>
        <strong>${Math.round(daily.temperature_2m_max[i])}°/${Math.round(daily.temperature_2m_min[i])}°</strong>

                <span class="small">
                    🌧️ ${daily.precipitation_probability_max[i]}%
                </span>

            </div>
        `;
    }
    weather.innerHTML =`
    <div class="weather-main">

            <h2>
                📍 ${name}, ${country}
            </h2>

            <div class="weather-icon">
                ${getIcon(current.weather_code)}
            </div>

            <div class="temperature">
                ${Math.round(current.temperature_2m)}°C
            </div>

            <p class="condition">
                ${getCondition(current.weather_code)}
            </p>

        </div>


        <div class="weather-info">

            <div>
                <strong>
                    ${Math.round(current.apparent_temperature)}°C
                </strong>
                <span class="small">
                    Feels Like
                </span>
            </div>

            <div>
                <strong>
                    ${current.relative_humidity_2m}%
                </strong>
                <span class="small">
                    Humidity
                </span>
            </div>

            <div>
                <strong>
                    ${Math.round(current.wind_speed_10m)} km/h
                </strong>
                <span class="small">
                    Wind
                </span>
            </div>

            <div>
                <strong>
                    ${daily.precipitation_probability_max[0]}%
                </strong>
                <span class="small">
                    Rain Chance
                </span>
            </div>

        </div>


        <h2>5-Day Forecast</h2>

        <div class="forecast">
            ${forecast}
        </div>
    `;
    
    
}
function getCondition(code){
    if(code===0)return "Clear sky";
    if(code<=2)return "Partly cloudy";
    if(code===3)return "Overcast";
    if(code<=48)return "Foggy";
    if(code<=67)return "Rain";
    if(code<=77)return "Snow";
    if(code<=82)return "Rain showers";
    if(code<=86)return "Snow showers";
    if(code>=95)return "Thunderstorm";
    return "Unknown";

}
function getIcon(code){
    if (code === 0) return "☀️";
    if (code === 1) return "🌤️";
    if (code === 2) return "⛅";
    if (code === 3) return "☁️";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    if (code <= 86) return "🌨️";
    if (code >= 95) return "⛈️";

    return "🌤️";

}
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);