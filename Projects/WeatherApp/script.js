const notificationElement = document.querySelector('.notification')
const iconElement = document.querySelector('.weather-icon i')
const tempElement = document.querySelector('.temperature-value strong')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')
const degreeElement = document.querySelector('.degree')
const degreeHandler = document.querySelector('.degreeValue')
const celsiusElement = degreeHandler.querySelector('.celsius')
const fahrenheitElement = degreeHandler.querySelector('.fahrenheit')

const KELVIN = 273

const apiKey = '0c5ddce8d306fa07649d3426921094e7'

const dict = {
  '01d': 'wi-day-sunny',
  '02d': 'wi-day-cloudy',
  '03d': 'wi-cloud',
  '04d': 'wi-cloudy',
  '09d': 'wi-showers',
  '10d': 'wi-day-rain-mix',
  '11d': 'wi-thunderstorm',
  '13d': 'wi-snow',
  '50d': 'wi-fog',
  '01n': 'wi-night-clear',
  '02n': 'wi-night-alt-cloudy',
  '03n': 'wi-night-alt-cloudy-high',
  '04n': 'wi-cloudy',
  '09n': 'wi-night-alt-sprinkle',
  '10n': 'wi-night-alt-showers',
  '11n': 'wi-night-alt-thunderstorm',
  '13n': 'wi-night-alt-snow',
  '50n': 'wi-night-fog'
};

const weather = {
  temperature: {
    value: '-',
    unit: 'celsius'
  },
  description: 'few clouds',
  iconId: '02n',
  city: 'Saint-Petersburg',
  country: 'Russia'
}

if('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
  notificationElement.style.display = 'block'
  notificationElement.textContent = `Browser Doesn't Support Geolocation`
}

degreeHandler.addEventListener('click', (e) => {

  if(weather.temperature.value === undefined) return

  if(e.target.textContent === 'celsius') {
    tempElement.textContent = `${weather.temperature.value}`
    
    degreeElement.textContent = ' C'

    celsiusElement.className = 'celsius currentDegree'
    fahrenheitElement.className = 'fahrenheit'
    
  } else {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value)
    fahrenheit = Math.round(fahrenheit)

    isNaN(fahrenheit) 
    ? tempElement.textContent = '-'
    : tempElement.textContent = `${fahrenheit}`
      degreeElement.textContent = ' F'

      celsiusElement.className = 'celsius'
      fahrenheitElement.className = 'fahrenheit currentDegree'
      
  }
})

function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

  fetch(api)
    .then((response) => response.json())
    .then(data => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN)
      weather.description = data.weather[0].description
      weather.iconId = data.weather[0].icon
      weather.city = data.name
      weather.country = data.sys.country
      console.log(data)
    })
    .then(() => displayWeather())
}

function displayWeather(degree) {
  iconElement.className = `wi ${dict[weather.iconId]}`

  tempElement.textContent = `${weather.temperature.value}`
  
  degreeElement.textContent = ` ${degree}`

  degreeElement.textContent = ` C`

  descElement.textContent = weather.description

  locationElement.textContent = `${weather.city}, ${weather.country}`
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32
}

function setPosition(position) {
  let latitude = position.coords.latitude
  let longitude = position.coords.longitude

  getWeather(latitude, longitude)
}

function showError(error) {
  notificationElement.style.display = 'block'
  notificationElement.textContent = `${error.message}`
}




