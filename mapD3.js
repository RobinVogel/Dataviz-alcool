
$(function () {
    //debugger
    // Prepare random data
      var input = $.ajax("alcool.csv",{async: false}).responseText;
      var data = $.csv.toObjects(input); //input);
      
  // debugger
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=europe.geo.json&callback=?', function (geojson) {
          
        // Initiate the chart
        $('#container').highcharts('Map', {

            title : {
                text : "Consommation en litres par habitant et par an par pays d'Europe"
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            colorAxis: {
                // min: 0,
                // max: 15,
                dataClasses: [{
                    from: 0,
                    to: 1,
                    color: "#F1EEF6"
                }, {
                    from: 1,
                    to: 3,
                    color: "#D4B9DA"
                }, {
                    from: 3,
                    to: 5,
                    color: "#C994C7"
                }, {
                    from: 5,
                    to: 7,
                    color: "#DF65B0"
                }, {
                    from: 7,
                    to: 9,
                    color: "#DD1C77"
                }, {
                    from: 9,
                    to : 11,
                    color: "#980043"
                }, {
                    from: 11,
                    to : 15,
                    color: "#4c0021"
                }]
            },

            series : [{
                data : data,
                mapData: geojson,
                joinBy: ['WB_A2', 'code'],
                name: "Litres d'alcool",
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: false,
                    // format: '{point.properties.postal}'
                }
            }]
        });
    });
});
