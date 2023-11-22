function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const day = "today";
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const todayUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=today`;
            console.log("Today URL:", todayUrl);

            fetch(todayUrl)
                .then(response => response.json())
                .then(data => {
                    console.log("Today's Data:", data);
                    // Display Today's Forecast
                    document.querySelector('#sunrise').innerHTML = data.results.sunrise;
                    document.querySelector('#sunset').innerHTML = data.results.sunset;
                    document.querySelector('#Dawn').innerHTML = data.results.dawn;
                    document.querySelector('#Dusk').innerHTML = data.results.dusk;
                    document.querySelector('#day-length-today').innerHTML = data.results.day_length;
                    document.querySelector('#solar-noon-today').innerHTML = data.results.solar_noon;
                    document.querySelector('#time-zone').innerHTML = data.results.timezone;

                    // Display Current Date
                    const currentDate = new Date();
                    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = currentDate.toLocaleDateString('en-US', options);
                    document.querySelector('#current-date').innerHTML = formattedDate;

                    // Fetch Tomorrow's Forecast
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const tomorrowUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${tomorrow.toISOString().split('T')[0]}`;
                    console.log("Tomorrow URL:", tomorrowUrl);
                    return fetch(tomorrowUrl);
                })
                .then(response => response.json())
                .then(dataTomorrow => {
                    console.log("Tomorrow's Data:", dataTomorrow);

                    // Display Tomorrow's Forecast
                    if (dataTomorrow.results) {
                        document.querySelector('#sunrise-tomorrow').innerHTML = dataTomorrow.results.sunrise || 'N/A';
                        document.querySelector('#sunset-tomorrow').innerHTML = dataTomorrow.results.sunset || 'N/A';
                        document.querySelector('#Dawn-tomorrow').innerHTML = dataTomorrow.results.dawn || 'N/A';
                        document.querySelector('#Dusk-tomorrow').innerHTML = dataTomorrow.results.dusk || 'N/A';
                        document.querySelector('#day-length-tomorrow').innerHTML = dataTomorrow.results.day_length || 'N/A';
                        document.querySelector('#solar-noon-tomorrow').innerHTML = dataTomorrow.results.solar_noon || 'N/A';
                        document.querySelector('#time-zone-tomorrow').innerHTML = dataTomorrow.results.timezone || 'N/A';
                        const dateElementId = `${day}-date`;
                        const nextDay = new Date();
                        nextDay.setDate(nextDay.getDate() + 1);
                        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        const formattedDate = nextDay.toLocaleDateString('en-US', options);
                        document.querySelector(`#tomorrow-date`).innerHTML = `${formattedDate}`;
                    } 
                    else {
                        console.error("No results for tomorrow's forecast");
                    }
                })
                .catch(error => console.error('Error:', error));

        }, function () {
            displayError('Error fetching current location.');
        });
    } else {
        displayError('Geolocation is not supported by this browser.');
    }
}
