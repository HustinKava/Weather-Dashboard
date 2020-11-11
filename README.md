# Weather-Dashboard

<p>
    <a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://camo.githubusercontent.com/3ccf4c50a1576b0dd30b286717451fa56b783512/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c6963656e73652d4d49542d79656c6c6f772e737667" alt="License: MIT" data-canonical-src="https://img.shields.io/badge/License-MIT-yellow.svg" style="max-width:100%;"></a>
</p>

<h2>Description</h2>

<p>For this homework assignment I was tasked with creating a Weather Dashboard application! The web application allows a user to enter any city in the world and view the forecast for the current date, as well as the forecast for the next 5 days.</p>

<h2>How it works</h2>

<p>The user interface is very simple to use. User simply inputs the city they want the weather information on within the search bar and click the search button.

Once the user has made the request, the JavaScript works in the background to make three API calls. The first request will be to receive data on the temperature, humidity, wind speed, latitude and longitude. 

The second request will pull the UV index value by using the latitude and longitude data received from the first request.

The third request will will pull the information for the next 5 days. It will grab the temperature and humidity values.

At the same time the user submits a search, the history will be stored to local storage and generate a clickable history list under the search bar. The values will persist once the page has been reloaded so I have added a clear history button that will clear local storage and set the search history back to an empty array.</p>

<h2>My Experience</h2>

<p>This homework was difficult and I found that scope was a main issue for me. Thankfully I made many comments in my code as it is very easy to get lost within it. I am very happy of the outcome and look to improve upon it in the future as I plan to use this application personally.</p>

<h2>Screenshot</h2>

![](/assets/images/Screenshot.PNG)

<p>
To view this web application please click <a href="https://hustinkava.github.io/Weather-Dashboard/" rel="nofollow">here</a>
</p>
