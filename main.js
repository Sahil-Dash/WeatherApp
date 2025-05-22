// Set Api Key and Initial Location (City Name) to start with
const API_KEY = '66a61f9468bf4202a7454827221706';
const initialLocation = 'Bhubaneswar';

// Weather data configuration
const weatherData = {
    'sunny': {
        temperature: '28°',
        condition: 'Sunny',
        icon: 'sunny-icon',
        background: 'sunny',
        conditionIcon: '#FFD700',
        details: {
            feelsLike: '32°',
            humidity: '45%',
            wind: '8 km/h',
            pressure: '1015 mb',
            visibility: '15 km',
            uvIndex: '8',
            currentCondition: 'Clear Sky'
        }
    },
    'cloudy': {
        temperature: '22°',
        condition: 'Cloudy',
        icon: 'cloudy-icon',
        background: 'cloudy',
        conditionIcon: '#9CA3AF',
        details: {
            feelsLike: '24°',
            humidity: '75%',
            wind: '15 km/h',
            pressure: '1008 mb',
            visibility: '8 km',
            uvIndex: '3',
            currentCondition: 'Overcast'
        }
    },
    'partly-cloudy': {
        temperature: '25°',
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy-icon',
        background: 'partly-cloudy',
        conditionIcon: '#60A5FA',
        details: {
            feelsLike: '27°',
            humidity: '55%',
            wind: '12 km/h',
            pressure: '1012 mb',
            visibility: '12 km',
            uvIndex: '6',
            currentCondition: 'Partly Cloudy'
        }
    },
    'rainy': {
        temperature: '18°',
        condition: 'Rainy',
        icon: 'rainy-icon',
        background: 'rainy',
        conditionIcon: '#3B82F6',
        details: {
            feelsLike: '16°',
            humidity: '85%',
            wind: '20 km/h',
            pressure: '1005 mb',
            visibility: '5 km',
            uvIndex: '2',
            currentCondition: 'Light Rain'
        }
    },
    'stormy': {
        temperature: '20°',
        condition: 'Stormy',
        icon: 'stormy-icon',
        background: 'stormy',
        conditionIcon: '#374151',
        details: {
            feelsLike: '18°',
            humidity: '90%',
            wind: '35 km/h',
            pressure: '998 mb',
            visibility: '3 km',
            uvIndex: '1',
            currentCondition: 'Thunderstorm'
        }
    },
    'snowy': {
        temperature: '-2°',
        condition: 'Snowy',
        icon: 'snowy-icon',
        background: 'snowy',
        conditionIcon: '#E5E7EB',
        details: {
            feelsLike: '-8°',
            humidity: '80%',
            wind: '18 km/h',
            pressure: '1020 mb',
            visibility: '2 km',
            uvIndex: '1',
            currentCondition: 'Heavy Snow'
        }
    },
    'windy': {
        temperature: '24°',
        condition: 'Windy',
        icon: 'windy-icon',
        background: 'windy',
        conditionIcon: '#10B981',
        details: {
            feelsLike: '20°',
            humidity: '60%',
            wind: '45 km/h',
            pressure: '1010 mb',
            visibility: '12 km',
            uvIndex: '5',
            currentCondition: 'Very Windy'
        }
    },
    'foggy': {
        temperature: '16°',
        condition: 'Foggy',
        icon: 'foggy-icon',
        background: 'foggy',
        conditionIcon: '#D1D5DB',
        details: {
            feelsLike: '14°',
            humidity: '95%',
            wind: '5 km/h',
            pressure: '1018 mb',
            visibility: '0.5 km',
            uvIndex: '1',
            currentCondition: 'Dense Fog'
        }
    }
};

let currentWeather = 'sunny';

// Function to change weather condition
function changeWeather(weatherType, data = weatherData) {
    currentWeather = weatherType;
    // const data = weatherData[weatherType];
    console.log(data);
    // Update body class for background
    document.body.className = data.background;
    
    // Update weather icon
    const weatherIcon = document.getElementById('weatherIcon');
    weatherIcon.className = `weather-icon ${data.icon}`;
    
    // Update main weather info
    document.getElementById('temperature').textContent = data.temperature;
    document.getElementById('conditionText').textContent = data.condition;
    
    // Update condition icon color
    const conditionIcon = document.getElementById('conditionIcon');
    conditionIcon.style.background = data.conditionIcon;
    
    // Update weather details
    document.getElementById('feelsLike').textContent = data.details.feelsLike;
    document.getElementById('humidity').textContent = data.details.humidity;
    document.getElementById('wind').textContent = data.details.wind;
    document.getElementById('pressure').textContent = data.details.pressure;
    document.getElementById('visibility').textContent = data.details.visibility;
    document.getElementById('uvIndex').textContent = data.details.uvIndex;
    document.getElementById('currentCondition').textContent = data.details.currentCondition;
    
    document.getElementById('lastUpdated').textContent = data.lastUpdated;
    
    // Update active button
    document.querySelectorAll('.weather-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // event.target.classList.add('active');
}

// Function to handle location search
function searchLocation() {
    const searchInput = document.getElementById('search-input');
    const location = searchInput.value.trim();
    
    if (location) {
        handleWeatherAPIResponse(location);
        searchInput.value = '';
    }
}

// Function to select a location
function selectLocation(locationName) {
    document.getElementById('location').textContent = locationName;
    
    // Update date and time
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: '2-digit', 
        month: 'short', 
        day: 'numeric' 
    };
    const dateStr = now.toLocaleDateString('en-GB', options);
    const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    document.getElementById('dateTime').textContent = `${timeStr} - ${dateStr}`;
}

// Function to simulate API weather data fetching
function fetchWeatherData(location, condition, data) {
    // This is where you would integrate with your weather API
    // For now, we'll use the static data
    changeWeather(condition, data);
    selectLocation(location);
}

// Example function to demonstrate API integration
async function handleWeatherAPIResponse(loc = initialLocation) {
    // Map API conditions to your weather types
    const conditionMap = {
        'clear': 'sunny',
        'sunny': 'sunny',
        'cloudy': 'cloudy',
        'overcast': 'cloudy',
        'partly cloudy': 'partly-cloudy',
        'rain': 'rainy',
        'drizzle': 'rainy',
        'thunderstorm': 'stormy',
        'storm': 'stormy',
        'snow': 'snowy',
        'blizzard': 'snowy',
        'wind': 'windy',
        'fog': 'foggy',
        'mist': 'foggy'
    };
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc}`);
      if (!response.ok) throw new Error('API Error');

      const jsonResponse = await response.json();
      const location = jsonResponse.location.name;
      const condition = jsonResponse.current.condition.text;
      const mappedCondition = conditionMap[condition.toLowerCase()] || 'sunny';

      const { temp_c, feelslike_c, humidity, wind_kph, pressure_mb, vis_km, uv, last_updated } = jsonResponse.current;
      const data = {
          temperature: temp_c + ' C',
          condition: mappedCondition,
          icon: mappedCondition + '-icon',
          background: mappedCondition,
          conditionIcon: weatherData[mappedCondition].conditionIcon,
          lastUpdated: last_updated.split(' ').at(-1),
          details: {
              feelsLike: `${feelslike_c}* C`,
              humidity: `${humidity} %`,
              wind: `${wind_kph} km/h`,
              pressure: `${pressure_mb} mb`,
              visibility: `${vis_km} km`,
              uvIndex: uv,
              currentCondition: weatherData[mappedCondition].details.currentCondition
          }
      }
      fetchWeatherData(location, mappedCondition, data);
    } catch (error) {
      console.error('Weather fetch failed:', error);
      
    }

    
}

// Add enter key support for search
document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchLocation();
    }
});

// Initialize with current date and time
document.addEventListener('DOMContentLoaded', function() {
    handleWeatherAPIResponse();
});

// Auto-update time every minute
setInterval(function() {
    const location = document.getElementById('location').textContent;
    selectLocation(location);
}, 60000);
