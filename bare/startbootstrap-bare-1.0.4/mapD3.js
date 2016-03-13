/*
Originellement, Mike Bostock utilise un topojson et non un geojson
L'avantage du topojson est qu'il prend en compte les frontières communes,
du coup le fichier est beaucoup moins lourd
*/
/*
var width = 960,
    height = 600;

var rateById = d3.map();

var quantize = d3.scale.quantize()
    .domain([0,15]) // The value ranges from 0 to 15 
    .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

var projection = d3.geo.equirectangular()
    .scale(1280)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

queue()
    .defer(d3.json, "europe.geo.json")
    .defer(d3.csv, "alcool.csv", function(d) { rateById.set(d.id, +d.Value); })
    // Normalement il devrait y avoir les données dans l'objet à ce moment
    .await(ready);

function ready(error, europe) {
  if (error) throw error;
  
  // debugger  Permet de débugger et de voir ce qu'il se passe ici

  var europe_feat = europe.features;
  
  // console.log(europe_feat);

  // europe_feat.objects  itérable sur l'ensemble des objets dans europe
  debugger
  svg.append("g")
      .attr("class", "counties")
    .selectAll("path")
      .data(europe_feat)
    .enter().append("path")
      .attr("class", function(d) { return quantize(rateById.get(d.id)); })
      .attr("d", path);
     
     debugger
  svg.append("path")
      .datum(europe_feat)
      .attr("class", "geometry")
      .attr("d", path);
}

d3.select(self.frameElement).style("height", height + "px");
*/

$(function () {
    //debugger
    // Prepare random data
      // var input = jQuery.get("alcool.csv").done();
      var input = $.ajax("alcool.csv",{async: false}).responseText;
      // debugger .ready(...);
      // debugger
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
                min: 0,
                max: 15
            },

            series : [{
                data : data,
                mapData: geojson,
                joinBy: ['WB_A2', 'code'],
                name: 'Random data',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.properties.postal}'
                }
            }]
        });
    });
});
