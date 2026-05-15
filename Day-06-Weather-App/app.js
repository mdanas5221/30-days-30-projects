const input = document.querySelector("#search-city");
const btn = document.querySelector("#search-btn");
const mainCard = document.querySelector(".main-card");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelectorAll(".temperature");
const msg = document.querySelector(".msg");
const weatherImg = document.querySelector("#weather-image");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

// DEFAULT FUNCTION ON LOAD
window.addEventListener("load", function () {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (cities && cities.length > 0) {
    let lastCity = cities[cities.length - 1];

    input.value = lastCity;
    getTemperature(lastCity);
  }
});

// SEARCH EVENTLISTENER FUNCTION
btn.addEventListener("click", function () {
  let city = input.value.trim();
  if (city === "") {
    alert("Please first enter a city...");
    return;
  } else {
    getTemperature(city);
    saveCity();
  }
});

// API CALL & GET TEMPERATURE FUNCTION
async function getTemperature(city) {
  // CALL API --> TRY
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&YOUR API KEY HERE`;
    let req = await fetch(url);
    let data = await req.json();

    // DATA CITY NAME
    let resCityName = data.name;
    cityName.textContent = resCityName;

    // DATA TEMPERATURE
    temperature.forEach((e) => {
      let resTemp = data.main.temp;
      e.innerHTML = `${resTemp}<sup>&deg;C</sup>`;
    });

    // DATA HUMIDITY
    let resHumidity = data.main.humidity;
    humidity.innerHTML = `${resHumidity}%`;

    // DATA WIND SPEED
    let resWind = data.wind.speed;
    wind.innerHTML = `${resWind} Km/h`;

    // DATA MASSAGE
    let resMsg = data.weather[0].main;
    msg.textContent = resMsg;

    // SWITCH IMAGES AND COLORS OF WEATHERS
    switch (resMsg) {
      case "Clear":
        weatherImg.src = "assets/clear.png";
        mainCard.style.background =
          "linear-gradient(to right, #4facfe, #3983eb)";

        break;
      case "Clouds":
        weatherImg.src = "assets/clouds.png";
        mainCard.style.background =
          "linear-gradient(to right, #4facfe, #2a7ce6)";

        break;
      case "Rain":
        weatherImg.src = "assets/rainy-day.png";
        mainCard.style.background =
          "linear-gradient(to right, #4facfe, #112136)";

        break;
      case "Drizzle":
        weatherImg.src = "assets/drizzle.png";
        mainCard.style.background =
          "linear-gradient(to right, #4facfe, #3c72b8)";

        break;
      case "Thunderstorm":
        weatherImg.src = "assets/thunderstorm.png";
        mainCard.style.background =
          "linear-gradient(to right, #4facfe, #071444)";

        break;
      case "Snow":
        weatherImg.src = "assets/snow.png";
        mainCard.style.background =
          "linear-gradient(to right, #4facfe, #0938e1)";

        break;
      case "Haze":
      case "Smoke":
        weatherImg.src = "assets/haze.png";
        mainCard.style.background =
          "linear-gradient(to right, #4facfe, #b2bde7)";
        break;
      default:
        console.log("error to load image");
        break;
    }
  } catch (err) {
    // CATCH ERROR OF API CALL
    console.log("Error", err);
  }
}

// ENTER KEY EVENTLISTENER
input.addEventListener("keydown", function (e) {
  let city = input.value.trim();
  if (e.key === "Enter") {
    getTemperature(city);
    saveCity();
  }
});

// SAVE CITY FUNCTION
function saveCity() {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  let city = input.value.trim();

  if (!cities.includes(city)) {
    cities.push(city);
  }

  localStorage.setItem("cities", JSON.stringify(cities));
}
