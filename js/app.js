const weatherForm = document.querySelector("#weatherForm");
const weatherInfoDiv = document.getElementById("weatherInfo");

weatherForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  const city = document.getElementById("cityInput").value;
  const apiKey = "a22ea2b2c75e9c42b90f29574497c3bb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    // استخراج المعلومات وعرضها
    const weatherDescription = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfoDiv.innerHTML = `
      <p>The weather in ${city} is: ${weatherDescription}</p>
      <p>Temperature: ${temp}°C</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind speed: ${windSpeed} m/s</p>
    `;
  } catch (error) {
    weatherInfoDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
});
