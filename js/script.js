/*global $*/
//make sure put all JavaScript inside the function
$(document).ready(function() {
    $("h6").hide();
    $("#buttonSearch").click(function() {
        //alert("clicked");
        getDataFromConditionApi(userInput());
    });
    $("input").keyup(function(event){
    if(event.keyCode == 13){
        $("#buttonSearch").click();
    }
    });
    $("#instruction").click(function() {
        $("h6").toggle(1000);
    });
    
    //this Function takes in the User Input Data
    function userInput() {
        var userSearch = $("input").val();
        return userSearch;
        
    }
    
    //Simon Is Working on this
    //Function takes in the USer Input and puts it into the link
    function getDataFromConditionApi(userInput) {
        //makes are Variable that has the API linj
        var apiConditionUrl = "https://api.wunderground.com/api/13505fd272f8b46a/conditions/q/CA/" + userInput + ".json"; 
       $.ajax({
            url: apiConditionUrl,
            method: "GET",
            success: function(response){
              var temp = response.current_observation.temp_f;
              var city = response.current_observation.display_location.city;
              var logoWord = response.current_observation.icon;
              var logo = response.current_observation.icon_url;
              var zip = response.current_observation.display_location.zip
              displayUserData(logoWord, logo, temp, city, zip);
              //console.log(logoWord);
            },
    });
    }
    //this function gets the forecast from the userinput of the zip code
    function getDataFromForecastApi(userInput) {
        var apiForecastUrl = "https://api.wunderground.com/api/13505fd272f8b46a/forecast/q/CA/" + userInput + ".json";    
       $.ajax({
            url: apiForecastUrl,
            method: "GET",
            success: function(response){
                for(var i = 0; i < response.forecast.simpleforecast.forecastday.length; i++){
              var dayOfWeek = response.forecast.simpleforecast.forecastday[i].date[13];
              var dayIcon = response.forecast.simpleforecast.forecastday[i].icon;
              var dayIconImg = response.forecast.txt_forcast.forecastday[i].icon_url;
              var dayHighTemp = response.forecast.txt_forcast.forecastday[i].high[0];
              var dayLowTemp = response.forecast.txt_forcast.forecastday[i].low[0];
                }
                
            },  
       });
    }
    
    
    
    //Jason is working on this and It displays user data
    function displayUserData(logoWord,logo, temp, city, zip) {
        $("#dayWeather").html("<img src=" + logo + " height='100px' width='100px'>");//logo
        $("#city").text(city + " ");//city name
        $("#dayWeather").append(temp +"F ");//temperature
        $("#city").append(zip);
    }
    function displayForecastData(dayWeek, dayIcon, dayIconImg, dayHighTemp, dayLowTemp){
        $("#forecast").html("<img src=" + dayIconImg + "height='100px' width='100px'>");
        $("#day").text(dayWeek);
        $("")
        
    }
    
    
    
    
    
});