async function getWeather() {
  const city = document.getElementById("city").value;
  const apiKey = API_KEY;

  // Step 1: Get latitude & longitude from city
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();
  console.log('GeoData:', geoData);

  if (geoData.length === 0) {
    document.getElementById("result").innerHTML = "City not found!";
    return;
  }

  const { lat, lon, name, country } = geoData[0];

  // Step 2: Get weather using coordinates
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const data = await weatherResponse.json();
  console.log('WeatherData:', data);

  // Weather details
  const temp = data.main.temp;
  const desc = data.weather[0].description;
  const icon = data.weather[0].icon;

  // Step 3: Update UI
  document.getElementById("result").innerHTML = `
    <p><b>${name}, ${country}</b></p>
    <p>🌡️ Temperature: ${temp} °C</p>
    <p>☁️ Weather: ${desc}</p>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon">
  `;

  // Step 4: Change background dynamically
  const body = document.body;
  if (desc.includes("cloud")) {
    body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
  } else if (desc.includes("rain")) {
    body.style.background = "linear-gradient(to right, #00c6fb, #005bea)";
  } else if (desc.includes("clear")) {
    body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
  } else {
    body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
  }
}
