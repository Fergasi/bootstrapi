const button1 = document.querySelector('#button1');
const image1 = document.querySelector('#image1');

button1.addEventListener('click', function(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(function(httpResponse){
        console.log('Step 2 - get HTTP response');
        //console.log(httpResponse.json()); 
        return httpResponse.json() // use .json() to parse your response/make it easier to find the data you are looking for (the JSON formatted promise, and Promise result)
    })
    .then(function (data){
        console.log('Step 3 - Parse our data recieved from API');
        console.log(data); // our formatted JSON object / formatted Promise
        console.log(data.message);
        image1.src = data.message;
       // image1.style.width = '300px';
       image1.style.height = '260px';
    })
})

// Weather App

const button2 = document.querySelector('#button2');
const city = document.querySelector('#input');
const temp = document.querySelector('#temperature');
const wind = document.querySelector('#wind');
const description = document.querySelector('#description');
const cityName = document.querySelector('#cityName');
const currentDay = document.querySelector('#currentDay');
const forecastTable = document.querySelector('#forecastTable');
const spaceForAlert = document.querySelector('#spaceForAlert');
const currentReport = document.querySelector('#currentReport');
//const icon = document.querySelector('#icon');

button2.addEventListener('click', function(){
    spaceForAlert.innerHTML = '';
    let cityQuery = city.value;

    fetch(`https://goweather.herokuapp.com/weather/${cityQuery}`)
    .then(function(httpResponse){ 
        return httpResponse.json() // use .json() to parse your response/make it easier to find the data you are looking for (the JSON formatted promise, and Promise result)
    })
    .then(function (data){
        console.log(data);
        cityName.innerHTML = cityQuery;
        currentDay.innerHTML = forecastDayOfTheWeek(0)
        temp.innerHTML = `Temperature: ${data.temperature}`;
        wind.innerHTML = `Wind: ${data.wind}`;
        description.innerHTML = `Condtions: ${data.description}`;
       
        //document.querySelector("#forcast1 > th").innerHTML = forecastDayOfTheWeek(1);
        //document.querySelector("#forcast1 > td:nth-child(2)").innerHTML = data.forecast[0].temperature;
        //document.querySelector("#forcast1 > td:nth-child(3)").innerHTML = data.forecast[0].wind;

        if(data.temperature !== ''){
            forecastTable.innerHTML = 
         `<table class="table">
            <thead>
            <tr>
                <th scope="col">Day</th>
                <th scope="col">Temp</th>
                <th scope="col">Wind</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">${forecastDayOfTheWeek(1)}</th>
                <td>${data.forecast[0].temperature}</td>
                <td>${data.forecast[0].wind}</td>
            </tr>
            <tr>
                <th scope="row">${forecastDayOfTheWeek(2)}</th>
                <td>${data.forecast[1].temperature}</td>
                <td>${data.forecast[1].wind}</td>
            </tr>
            <tr>
                <th scope="row">${forecastDayOfTheWeek(3)}</th>
                <td>${data.forecast[2].temperature}</td>
                <td>${data.forecast[2].wind}</td>
            </tr>
            </tbody>
         </table>`;
        } else {
            cityName.innerHTML = '';
            forecastTable.innerHTML = '';
            currentReport.innerHTML = '';
            currentDay.innerHTML = '';
            spaceForAlert.innerHTML = `<div class="alert alert-danger" role="alert">
            City is not available or does not exist, please try again!
          </div>`
        }
        

    })

    city.value = '';

})

// Helper function
function forecastDayOfTheWeek(num){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday"];
    const today = new Date();
    const day = today.getDay();
    return weekday[day + num]
}