var icon = {
    "01d": "01d.svg"
};

function convertDeg(sym, temp){
    if(sym === "cel"){
        return Math.round(temp - 273.15);
    } else if( sym === "fah"){
        return Math.round(temp * (9 / 5) - 459.67);
    }
}

function getDataForecast(lat, lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey,
    }).done(function (data) {
        console.log(data.list[0].main.temp);
        console.log(data);
        var tempArr = [];
        
        for(var n = 0; n < 8; n++){
            tempArr.push(convertDeg("fah", data.list[n].main.temp ))
        };
        
        //construct and display graph
        constGraph(tempArr[0], tempArr[1], tempArr[2], tempArr[3], tempArr[4], tempArr[5], tempArr[6], tempArr[7]);
        
//        document.getElementById("timeStmp").innerHTML = data.list[0].dt_txt+" ."+" ."+" ."+" ."+" . "+data.list[7].dt_txt;
    }).fail(function () {
        console.log("error: load ajax data");
    });
}

function getDataWeather(lat, lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey,
    }).done(function (data) {
        //Debug
        console.log(data);
        console.log(data.weather[0].description);

        //Description of weather
        document.getElementById("dataName").innerHTML = data.name + ", " + data.sys.country;
        document.getElementById("dataWeatherMain").innerHTML = data.weather[0].description;

        //Temperature celcius or farenheight
        var cDeg = Math.round(data.main.temp - 273.15);
        var fDeg = Math.round(data.main.temp * (9 / 5) - 459.67);
        document.getElementById("dataTemp").innerHTML = fDeg + "&#176;F";

        //Animated icon
        document.getElementById("animImg").setAttribute("src", "http://res.cloudinary.com/dxaedzhnh/image/upload/v1510274955/" + data.weather[0].icon + ".svg");
    }).fail(function () {
        console.log("error: load ajax data");
    });
}

const apiKey = "b8bf51788850f566304691d38e1f6f43";

// app config
function runTheApp() {

}

// Get location then run app. 
navigator.geolocation.getCurrentPosition(function (pos) {
    getDataForecast(pos.coords.latitude, pos.coords.longitude);
    getDataWeather(pos.coords.latitude, pos.coords.longitude);


}, function fail(err) {
    console.warn("error " + err.code + ": " + err.message);
});

// Construct graph
function constGraph(a,b,c,x,y,z,s,g,A,B) {
    var data = {
        labels: ['', '', '', '', '', '', '', ''],
        series: [
    [a, b, c, x, y, z, s, g]
  ]
    };

    var options = {
        width: "80vw",
        height: "40vw",
        showPoint: true,
        fullWidth: true,
        axisX: {
            showGrid: false,
            showLabel: true,
        },
        axisY: {
            showGrid: false,
            showLabel: true,
            offset: 25
        },
        chartPadding: {
            top: 15,
            right: 15,
            bottom: 0,
            left: 0
        },

    };

    var responsiveOptions = [
    ["screen and (min-width: 500px)", {
            width: "352px",
            height: "214px"
    }]
];

    new Chartist.Line('.ct-chart', data, options, responsiveOptions);
};
