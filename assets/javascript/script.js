//Storing html elements in variables
let searchbarContent = document.querySelector('.searchbar-content');
let searchbarInput = searchbarContent.querySelector('.searchbar-input');
let searchButton = searchbarContent.querySelector('.search-button');
let historyContent = document.querySelector('.history-content');
let cityName = document.querySelector('.city-name');
let weatherTemperature = document.querySelector('.weather-temperature');
let weatherHumidity = document.querySelector('.weather-humidity');
let weatherWindSpeed = document.querySelector('.weather-wind-speed');
let weatherUvIndex = document.querySelector('.weather-uv-index');
let fiveDayForecast = document.querySelector('.forecast');
let clearButton = document.querySelector('.clear-button');

//Global variable to store the search input, api key and the search history
let searchText;
let apiKey = '32e2f43ba93ca7e7987d0e123e9c252a';
let searchHistory = [];

//Converts the local storage data to a javascript object that gets stored in the search history variable
//If there is nothing to grab from local storage set history to an empty array so it doesn't get set as undefined
searchHistory = JSON.parse(localStorage.getItem('City')) || [];

//Wrapped the nested fetches in a function that passes the parameter city (it can be named anything)
let getWeather = (city) => {


    //Making a promise to get the api data from url depending on what the user input is within the search field
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey)

        //Then once we have the response, it gets converted into javascript object notation
        .then(response => response.json())

        //Then with the data from the response I console log the data
        .then(data => {
            // console.log(data)

            //Storing the data we recieved into variables by targeting the index value
            let pictureValue = data['weather'][0]['icon']
            let nameValue = data['name'];
            let temperatureValue = 'Temperature: ' + data['main']['temp'] + '°F';
            let humidityValue = 'Humidity: ' + data['main']['humidity'] + '%';
            let windspeedValue = 'Wind Speed: ' + data['wind']['speed'] + ' MPH';

            //Storing the lattitude and longitude into variables so we can get the uv index
            let lattitude = data['coord']['lat'];
            // console.log(lattitude);
            let longitude = data['coord']['lon'];
            // console.log(longitude);

            //Creaing a new image html element that I will append on to the city name
            let weatherPicture = document.createElement('img');
            weatherPicture.setAttribute("src", "https://openweathermap.org/img/wn/" + pictureValue + "@2x.png");
            weatherPicture.setAttribute("alt", data['weather'][0]['description']);

            //Setting the inner html elements with the data I stored into variables
            cityName.innerHTML = nameValue + ' (' + (moment().format('M/D/YYYY')) + ')';

            //Appending the weather icon on to the end of the city name
            cityName.append(weatherPicture);
            weatherTemperature.innerHTML = temperatureValue;
            weatherHumidity.innerHTML = humidityValue;
            weatherWindSpeed.innerHTML = windspeedValue;

            //Creating a nested fetch to get the uv index using the data we stored in the variables lattitude and longitude
            fetch('https://api.openweathermap.org/data/2.5/uvi?lat=' + lattitude + '&lon=' + longitude + '&appid=' + apiKey)
                .then(responseTwo => responseTwo.json())
                .then(dataTwo => {
                    // console.log(dataTwo)

                    //Removing the class with jquery each time 
                    $('.badge').removeClass();

                    //Storing the uv data value in a variable
                    let uvIndexValue = dataTwo['value'];
                    // console.log(uvIndexValue)

                    //Setting the uv badge color depending on value
                    if (uvIndexValue < 2) {
                        let uvIndex = document.createElement('span');
                        uvIndex.setAttribute('class', 'badge low');
                        uvIndex.innerHTML = uvIndexValue;
                        weatherUvIndex.innerHTML = 'UV Index: ';
                        weatherUvIndex.append(uvIndex);
                    } else if (uvIndexValue > 2 && uvIndexValue < 5) {
                        uvIndex = document.createElement('span');
                        uvIndex.setAttribute('class', 'badge moderate');
                        uvIndex.innerHTML = uvIndexValue;
                        weatherUvIndex.innerHTML = 'UV Index: ';
                        weatherUvIndex.append(uvIndex);
                    } else if (uvIndexValue >= 6 && uvIndexValue <=7) {
                        uvIndex = document.createElement('span');
                        uvIndex.setAttribute('class', 'badge high');
                        uvIndex.innerHTML = uvIndexValue;
                        weatherUvIndex.innerHTML = 'UV Index: ';
                        weatherUvIndex.append(uvIndex);
                    } else if (uvIndexValue >= 8 && uvIndexValue <=15) {
                        uvIndex = document.createElement('span');
                        uvIndex.setAttribute('class', 'badge very-high');
                        uvIndex.innerHTML = uvIndexValue;
                        weatherUvIndex.innerHTML = 'UV Index: ';
                        weatherUvIndex.append(uvIndex);
                    } else {
                        uvIndex = document.createElement('span');
                        uvIndex.setAttribute('class', 'badge extreme');
                        uvIndex.innerHTML = uvIndexValue;
                        weatherUvIndex.innerHTML = 'UV Index: ';
                        weatherUvIndex.append(uvIndex);
                    };

                    //Creating a fetch for the 5 day forecast
                    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=' + apiKey)
                        .then(responseThree => responseThree.json())
                        .then(dataThree => {
                            // console.log(dataThree)

                            //Creating a variable to hold the list contents
                            let holdContent = dataThree['list'];
                            // console.log(holdContent);

                            //Created a for loop that iterates by 8 through an array with the length of 40
                            for (let i = 0; i < holdContent.length; i += 8) {
                                // console.log(holdContent[i])
                                let forecastDate = new Date(holdContent[i]['dt'] * 1000);
                                // console.log(forecastDate)
                                let forecastDay = forecastDate.getDate() + 1;
                                // console.log(forecastDay)
                                let forecastMonth = forecastDate.getMonth() + 1;
                                // console.log(forecastMonth)                        
                                let forecastYear = forecastDate.getFullYear();
                                // console.log(forecastYear)

                                //Create a div tag that appends to the html element with the class name of forecast
                                let divElement = document.createElement('div');
                                divElement.setAttribute('class', 'col bg-primary text-white mx-3 mb-3 rounded');
                                fiveDayForecast.append(divElement);
                                let htmlForecastDate = document.createElement("p");
                                htmlForecastDate.setAttribute("class", "mt-3 mb-0 forecast-date");
                                htmlForecastDate.innerHTML = '<b>' + forecastMonth + "/" + forecastDay + "/" + forecastYear + '</b>';
                                divElement.append(htmlForecastDate);
                                let forecastPicture = holdContent[i]['weather'][0]['icon'];
                                // console.log(forecastPicture);

                                const htmlForecastWeather = document.createElement("img");
                                htmlForecastWeather.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastPicture + ".png");
                                htmlForecastWeather.setAttribute("alt", forecastPicture);
                                divElement.append(htmlForecastWeather);
                                let forecastTemp = holdContent[i]['main']['temp'];
                                // console.log(forecastTemp);

                                const htmlForecastTemp = document.createElement('p');
                                htmlForecastTemp.innerHTML = 'Temp: ' + forecastTemp + '°F';
                                divElement.append(htmlForecastTemp);
                                let forecastHumidity = holdContent[i]['main']['humidity'];
                                // console.log(forecastHumidity);

                                const htmlForecastHumidity = document.createElement("p");
                                htmlForecastHumidity.innerHTML = "Humidity: " + forecastHumidity + '%';
                                divElement.append(htmlForecastHumidity);
                            }
                        })
                })
        })

        //If the search value is not equal to a valid city name, this error will be alerted
        .catch(err => alert('Wrong city name!'))
};

//Event listener for when the search button is pressed
searchButton.addEventListener('click', function () {

    //Clear the 5-Day forecast element each time the search button is clicked
    $('.forecast').empty();

    //The input value submitted gets stored into the searchText variable
    searchText = searchbarInput.value;
    // console.log(searchText);

    //Stops function in its tracks if there is nothing entered in the searchbar
    if (!searchText) {
        return;
    }

    //When the search button is clicked, the get weather function is called and passes the variable search text which is storing the name of the city I searched for
    getWeather(searchText);

    //Then the name of the city we searched for gets pushed into the search history array that I created as a global empty array variable at the top
    searchHistory.push(searchText);

    //Then I set the local storage with the key name as 'City' and I use the json.stringy method to convert the search history value into a string that is in an array
    localStorage.setItem('City', JSON.stringify(searchHistory));

    //Calling the render search history function because I want the history to be generated as soon as the search button is clicked
    renderSearchHistory();
});

//Created a function that will render the search history under the searchbar
let renderSearchHistory = () => {

    //Empty out the history content html every time the function is run,. if I do not do this, the function will keep printing everything that is stored in local storage
    historyContent.innerHTML = '';

    //This for loop will create the HTML elements each time the search button is clicked
    for (let i = 0; i < searchHistory.length; i++) {

        //Created the html list items 
        const historyItem = document.createElement('input');
        historyItem.setAttribute('type', 'text');
        historyItem.setAttribute('readonly', true);
        historyItem.setAttribute('class', 'history-form form-control d-block bg-white');

        //Each time the function is run, the value will be the newest value that is stored in the search history array
        historyItem.setAttribute('value', searchHistory[i]);

        //Then I create an onclick evenet listener that passes an event in the function parameter
        historyItem.addEventListener('click', function (e) {

            //Clear the 5-Day forecast element each time the search button is clicked
            $('.forecast').empty();

            //The get weather function is called here and passes the event target value which would equal the city name that has been searched
            getWeather(e.target.value);
            // console.log(e.target.value);

        });

        //Appending the new html elements that were created above so they are inserted into the form tags we created in index.html
        historyContent.append(historyItem);



    }
}

//Created a click function that will clear the search history elements, local storage and set the search history to an empty array
clearButton.addEventListener('click', function () {
    searchHistory = [];
    renderSearchHistory()
    localStorage.clear()
});

//Calling this function makes the values persist when the page is reloaded
renderSearchHistory();