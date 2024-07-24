//Llamamos los componenetes del archivo html para luego ser modificados
const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('ciudad');
const weatherResult = document.getElementById('weather-result');
const cityNameElement = document.getElementById('nombre-ciudad');
const temperatureElement = document.getElementById('temperatura');
const descriptionElement = document.getElementById('descripcion');

//Clave api de openWeatherMap
const apiKey = 'TU_CLAVE'

//EventListener al formulario para controlar el vento de 'enviar'
weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();//Prevenimos el comportamiento por defecto del formulario

    //botenemos el valor del input
    const city = cityInput.value.trim();
    if (city != '') {
        fetchWeather(city);
        cityInput.value = ''; //Limpiamos el input
    }
});

//Function para obtener los valores de la API
function fetchWeather(city) {
    //URL de la API con la ciudad y la clave
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    //Hacemos una solicitud a la API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod === 200) { //Si la solicitud fue exitosa
                const {name, main, weather} = data;
                displayWeather(name, main.temp, weather[0].description);
            } else {
                alert('Ciudad no encontrada. Por favor vuelve a intentar.');
            }
        })
        .catch(error => console.log('Error al obtener el clima: ', error));
}

//Funcion para mostrar el clima en la interfaz
function displayWeather(cityName, temperature, description) {
    cityNameElement.textContent = cityName;
    temperatureElement.textContent = `Temperatura: ${temperature.toFixed(1)}°C`;
    descriptionElement.textContent = `Descripción: ${description}`;

    weatherResult.classList.remove('hidden'); //Mostramos la seccion
}