let $ = document
let inputElem = $.querySelector('input')
let buttonElem = $.querySelector('svg')
let locationTitle = $.querySelector('.location-title')
let temperatureText = $.querySelector('.temp-text')
let weatherText = $.querySelector('.weather-text')
let feelsLikeText = $.querySelector('.feels-like-text')
let maxTempText = $.querySelector('.max-temp')
let minTempText = $.querySelector('.min-temp')
let mainBox = $.querySelector('.main-box')
let url = "https://api.openweathermap.org/data/2.5/weather?q="
let key = "20f614cffcfcdb05dc60a6806a404e3a"
window.addEventListener("load", () => {
    fetch(`${url}tehran&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            showData(data)
            backgroundGenerator(data.weather[0].main)
        })
        .catch(() => {
            alert('Not Found')
        })
    inputElem.value = ''
}
)
function fetchData() {
    fetch(`${url}${inputElem.value}&appid=${key}`)
        .then(response => response.json())
        .then(data => {
            showData(data)
            backgroundGenerator(data.weather[0].main)
        })
        .catch(() => {
            mainBox.innerHTML = 'Not Found'
        })
    inputElem.value = ''
}
function showData(data) {
    locationTitle.innerHTML = `${data.name}, ${data.sys.country}`
    temperatureText.innerHTML = `${Math.round(data.main.temp - 273)}°C`
    weatherText.innerHTML = `${data.weather[0].main}`
    feelsLikeText.innerHTML = `Feels like: ${Math.round(data.main.feels_like - 273)}°C`
    maxTempText.innerHTML = `Max: ${Math.round(data.main.temp_max - 273)}°C`
    minTempText.innerHTML = `Min: ${Math.round(data.main.temp_min - 273)}°C`
}
function backgroundGenerator(backgroundText) {
    let body = $.querySelector('body')
    if (backgroundText === 'Clear') {
        body.style.backgroundImage = "url('images/clear.jpg')"
    } else if (backgroundText === 'Clouds') {
        body.style.backgroundImage = "url('images/clouds.jpg')"
    } else if (backgroundText === 'Rain') {
        body.style.backgroundImage = "url('images/rain.jpg')"
    } else if (backgroundText === 'Snow') {
        body.style.backgroundImage = "url('images/snow.jpg')"
    } else if (backgroundText === 'Thunderstorm') {
        body.style.backgroundImage = "url('images/thunderstorm.jpg')"
    } else if (backgroundText === 'Haze') {
        body.style.backgroundImage = "url('images/haze.jpg')"
    }
    else {
        body.style.backgroundImage = "url('images/default.jpg')"
    }
}
inputElem.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        fetch(`${url}${inputElem.value}&appid=${key}`)
            .then(response => response.json())
            .then(data => {
                showData(data)
                backgroundGenerator(data.weather[0].main)
            })
            .catch(() => {
                alert('Not Found')
            })
        inputElem.value = ''
    }
})
buttonElem.addEventListener('click', fetchData)