Whoa hey there! You found a secret! Solve the following challenges for the
"Señor" badge.

This is a real interview task for senior front-end developer.

Related screens are in react-weather-bonus.png

Requirements
Consume the OpenWeatherMap API (https://openweathermap.org/api) to obtain current weather data and
5-day forecast. Use the provided design to visualise the obtained data.

Screen States
The provided design is mobile-only, portrait-only and consists of roughly three screen states.
Initial state
The way the screen looks when the user hasn’t interacted with it (landing state). This state shows a weather
widget in the top section, which displays the basic weather information - temperature, type of weather,
location. There is also a large image that visualises the type of weather, as well as a “More Details” button.
The location name (Plovdiv in the example below) is clickable and is actually an active text input without any
border. When the input is activated, the looking glass disappears.
Depending on whether it’s sunny, or not, both image and the background color are different. Please use the
“Sunny” option when the weather is sunny or cloudy, and use the “Rainy” option for all other weather types.

Details state
In the details state, we show extra information, such as the current wind speed (top-left quadrant),
atmospheric pressure (top-right quadrant), cloudiness in percentage points (bottom-left quadrant) as well as
current humidity (bottom-right quadrant).
There is also a 24-hour forecast in this state, where we show information on a 3-hour basis, starting from the
current hour. The 24-hour forecast has two components that must be aligned - a temperature curve and
extra information below it. On the temperature curve, there must be a dot for every data point, showing the
temperature for that time. Below each dot, there must be an icon with the weather, wind speed and the hour
that the data is for. Please experiment with the horizontal spacing and alignment and add a horizontal scroll if
you feel it’s necessary.
Please note that there are some discrepancies between the above requirements for the 24-hour forecast
and the provided design - please follow the requirements as stated above.
Also, note how the weather widget is smaller and has stuck to the top of the screen, while the rest of the
screen scrolls. The location is still clickable - however, instead of it being an input, it causes the whole screen
to transition into its “Initial state”, and activates the input afterwards.

Next 4 days state
Please note - the design for the last section of the screen is still a work in progress and will be made
available in the future. Please implement a bare-bones layout that simply shows the data, using the styles of
the previous sections.
The 4-days forecast is a simple table, showing the weather info for the following days in rows. Each row
shows weather information as expected at 12:00 (noon) of the respective day. The row shows the date, the
expected temperature and expected weather type (sunny, cloudy, rain, etc).

Transitions

From “Initial state” to “Details state”
There are two ways for the user to transition between these two states - either by scrolling, or by clicking the
“More Details” button.
When the user scrolls, the weather type image (the lady on the cloud/sun) parallaxes in the opposite
direction and fades away. At the same time there is also a color transition - from the Initial state background
color (dependent on whether it’s sunny or not) to the Details state background color (which is always
“peachy”). In addition, the weather details component moves towards the top of the screen, get smaller as it
moves, and, when it reaches the top, becomes sticky and remains fixed at the top.
If the user clicks the “More details” button, the same transitions, as described above, happen automatically,
taking about 300-500ms. Please experiment with the duration and find the most natural option.
From “Details state” to “Initial state”
When in “Details state”, if the user clicks on the Location input in the weather widget, the screen performs
the reverse transition - to “Initial state”. After the transition, the Location input is active.
From “Details state” to “Next 4 days state”
As the user continues to scroll down, the “Details” section will start “pushing” towards the top weather
section. When that happens, the top section must stop being sticky and must allow the “Details” section to
push it off screen. The rest of the content simply scrolls from below.
When the Location Changes
If the user activates the Location input and changes the current location, the input shows a rotating spinner
instead of the looking glass and the interface freezes until we get the data. When we get the data, the screen
is in the “Initial state”.

Other Requirements
● Implementing location detection is a bonus feature.
● Implementing a way to switch between Celsius and Farenheit is a bonus feature.
● Figuring out a simple rearrangement of the layout to achieve a landscape orientation is a bonus
feature.
● Please use React+Redux for the implementation.
● If deemed necessary, please use redux-logic as an async middleware.
● Please use LESS for the stylesheets.
● Please implement error handling as you see fit.
● You are free to come up with a project structure that you feel works best, but keep in mind that it has
to be modular, extensible and following applicable architectural best practices.
● Please make it possible to add additional weather type images/colors easily, so that we can simply
“map” new image-color combinations to weather types (for the “Initial state” of the screen).

Extra Details
● You should be able to get all the relevant data from the OpenWeatherMap API, using the “Current
Weather” and “5 day / 3 hour” API calls.
● Please use the JSON output of the APIs.
● Please use a git repository and use a working process as you would normally do in day-to-day work.
