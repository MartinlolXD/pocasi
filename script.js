const cities = [
    {
        name: "Praha",
        id: 3067696
    },
    {
        name: "Brno",
        id: 3078610
    },
    {
        name: "Ostrava",
        id: 3069018
    },
    {
        name: "Plzeň",
        id: 3068160
    }
];

// Funkce pro inicializaci tlačítek měst
function initializeCityButtons() {
    const cityButtons = document.getElementById("cityButtons");
    cities.forEach(city => {
        const button = document.createElement("button");
        button.classList.add("city-button");
        button.textContent = city.name;
        button.addEventListener("click", function() {
            showWeather(city.id);
            setActiveButton(button);
        });
        cityButtons.appendChild(button);
    });
}

// Funkce pro zobrazení počasí vybraného města
function showWeather(cityId) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=YOUR_API_KEY&units=metric`)
        .then(response => response.json())
        .then(data => {
            const weatherDisplay = document.getElementById("weatherDisplay");
            weatherDisplay.innerHTML = `
                <h3>${data.name}</h3>
                <p>Teplota: ${data.main.temp}°C</p>
                <p>Počasí: ${data.weather[0].description}</p>
                <p>Vlhkost: ${data.main.humidity}%</p>
                <p>Rychlost větru: ${data.wind.speed} m/s</p>
            `;
        })
        .catch(error => {
            console.error('Chyba při získávání dat o počasí:', error);
            const weatherDisplay = document.getElementById("weatherDisplay");
            weatherDisplay.innerHTML = "Nepodařilo se načíst data o počasí.";
        });
}

// Funkce pro označení aktivního tlačítka města
function setActiveButton(selectedButton) {
    const buttons = document.querySelectorAll(".city-button");
    buttons.forEach(button => {
        if (button === selectedButton) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });
}

// Funkce pro aktualizaci dat o počasí
function updateWeather() {
    const activeButton = document.querySelector(".city-button.active");
    const cityName = activeButton.textContent;
    const city = cities.find(c => c.name === cityName);

    if (city) {
        showWeather(city.id);
    } else {
        alert("Prosím, vyberte město.");
    }
}

// Inicializace tlačítek měst při načtení stránky
initializeCityButtons();