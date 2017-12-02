function getData(lat, lon, cllbck) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey,
    }).done(function (data) {
        console.log(data);
    }).fail(function () {
        console.log("error: load ajax data");
    });
}

const apiKey = "b8bf51788850f566304691d38e1f6f43";

// app config
function runTheApp() {

}

// Before anything you need the location then run app. This is really the starting point. It's not sphagetti code, it's a knot.Therefore, any updates and plugins are ran from this point.  
// navigator.geolocation.getCurrentPosition(function(pos){
//   getData(pos.coords.latitude, pos.coords.longitude, function(){
//     runTheApp();
//   });
// }, function fail(err){
//   console.warn("error "+err.code+": "+err.message);
// });

var data = {
    labels: ['Mon', '', '', '', '', '', '', 'Fri'],
    series: [
    [18, 22, 28, 34, 32, 23, 20, 17]
  ]
};

var options = {
    width: 256,
    height: 150,
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
        bottom: 5,
        left: 0
    },

};

new Chartist.Line('.ct-chart', data, options);
