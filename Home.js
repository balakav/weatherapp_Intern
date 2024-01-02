let weatherData;
function getWeather() {
  const location = document.getElementById('locationInput').value;
  const apiKey = 'a22de587ac9c3e8e729cc841778f0a34'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      displayChart(data);
    })
    .catch(error => {
      console.log('Error fetching data:', error);
      document.getElementById('weatherInfo').innerHTML = 'Could not fetch weather data. Please try again.';
    });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h2>${data.city.name},${data.city.country}</h2>
    <p>Temperature: ${data.list[0].main.temp} &deg;C</p>
    <p>Description: ${data.list[0].weather[0].description}</p>
    <p>Humidity: ${data.list[0].main.humidity}%</p>
    <p>Wind Speed: ${data.list[0].wind.speed} m/s</p>
  `;
}

function displayChart(data) {
  const weatherChart = document.getElementById('weatherChart').getContext('2d');

  const dates = [];
  const temperatures = [];

  data.list.forEach(weather => {
    const date = new Date(weather.dt * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });

    if (!dates.includes(day)) {
      dates.push(day);
      temperatures.push(weather.main.temp);
    }
  });
  const backgroundColors = ['rgb(231, 45, 45)', 'rgb(50, 203, 50)', ' rgb(50, 50, 214)','rgb(210, 210, 21)','rgb(6, 195, 195)','pink'];

  const chart = new Chart(weatherChart, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{

        label: 'Temperature (°C) by Day',
        data: temperatures,
        backgroundColor:backgroundColors,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Temperature (°C)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Day'
          }
        }
      }
    }
  });
}
function printFunction() { 
  window.print().save(Weather.pdf); 
}
