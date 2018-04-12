/*global $*/
//make sure put all JavaScript inside the function
$(document).ready(function() {
    
    $("button").click(function() {
        //alert("clicked");
        getDataFromConditionApi(userInput());
    });
    $("input").keyup(function(event){
    if(event.keyCode == 13){
        $("button").click();
    }
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
        var apiUrl = "https://api.wunderground.com/api/13505fd272f8b46a/conditions/q/CA/" + userInput + ".json"; 
       $.ajax({
            url: apiUrl,
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
    //Jason is working on this and It displays user data
    function displayUserData(logoWord,logo, temp, city, zip) {
        $("#results").html("<img src=" + logo + ">");//logo
        $("#results").append(logoWord + " ");
        $("#results").append(city + " ");//city name
        $("#results").append(temp + "F");//temperature
        $("#results").append(zip);
    } 
    
    
    
    
      //getDataFromConditionApi(94112);
    
    
    
    
    
    
    
    
    
    
    
});