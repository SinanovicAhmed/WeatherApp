const locationn = document.querySelector(".location");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const searchBar = document.querySelector(".search-bar");
const feelsLike = document.querySelector(".feelsLikeTemp");
const humidity = document.querySelector(".humiditypercentage");
const hourlyWeather = document.querySelector(".hourly-weather");
const basicInfo = document.querySelector(".basic-info");
const dailyWeather = document.querySelector(".daily-weather");
const pressureinfo = document.querySelector(".pressureinfo");
const windinfo = document.querySelector(".windinfo");
const cloudsinfo = document.querySelector(".cloudsinfo");

function fetchHourlyWeather(city) {
  fetch(
    `https://community-open-weather-map.p.rapidapi.com/forecast?q=${city}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "5188ad3201mshe057d86d827e423p1656ecjsn46745597aac0",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      locationn.innerHTML = `${data.city.name.toUpperCase()}`;
      //left side (current time)
      temperature.innerHTML = `${Math.round(data.list[0].main.temp - 273)}°`;
      let icon = data.list[0].weather[0].icon;
      weatherIcon.style.backgroundImage = `url("http://openweathermap.org/img/wn/${icon}@2x.png")`;
      //right side humidity and feelsliketemp
      feelsLike.innerHTML = `Feels like: ${
        Math.round(data.list[0].main.feels_like) - 273
      }°`;
      humidity.innerHTML = `Humidity: ${data.list[0].main.humidity}%`;
      //adding hourly info
      hourlyWeather.innerHTML = "";
      for (let i = 0; i < 8; i++) {
        let time = data.list[i].dt_txt.substring(11, 16);
        let temp = Math.round(data.list[i].main.temp - 273);

        let divContent = `
        <div class="hourlycontainer" id="${i}">
          <div class="time">${time}</div>
          <div class="icon" id="icon${i}"></div>
          <div class="temp">${temp}°</div>
        </div>`;
        hourlyWeather.insertAdjacentHTML("beforeend", divContent);
        document.getElementById(
          `icon${i}`
        ).style.backgroundImage = `url("http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png")`;
      }
      //daily weather changed to some basic info

      pressureinfo.innerHTML = `Pressure: ${data.list[0].main.pressure}hPa`;
      windinfo.innerHTML = `Wind: ${Math.round(
        data.list[0].wind.speed * 1.6
      )}km/h`;
      cloudsinfo.innerHTML = `Clouds: ${data.list[0].clouds.all}%`;
    })
    .catch((error) => {
      console.log(error);
      window.alert(
        "Sorry, we can't find that place. Please try something else."
      );
    });
}

fetchHourlyWeather("sarajevo");
searchBar.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && searchBar.value != "") {
    fetchHourlyWeather(searchBar.value);
    searchBar.value = "";
    basicInfo.classList.add("animation-repeat");
    dailyWeather.classList.add("animation-repeat");
    hourlyWeather.classList.add("animation-repeat");
    setTimeout(() => {
      basicInfo.classList.remove("animation-repeat");
      dailyWeather.classList.remove("animation-repeat");
      hourlyWeather.classList.remove("animation-repeat");
    }, 20);
  }
});
