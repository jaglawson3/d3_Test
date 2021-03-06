//This is a test of basic data to implement d3 visualizations

//script src='http://d3js.org/d3.v3.min.js'
//This is a test of basic data to implement d3 visualizations

//Points to Json file
//<script src="data.json" type="text/javascript"></script>


var data; // a global




var margin = {top: 30, right: 20, bottom: 30, left: 50}, width = 600 - margin.left - margin.right,
height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.stat); });

var svg = d3.selectAll(".test") .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("/testjson/testdata.json", function(error, json){
    if(error) return console.warn(error);
    data = json;
    visualizeit();
});

// Scale the range of the data
function visualizeit(){
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.stat; })]);

    svg.append("path") // Add the valueline path.
      .attr("class", "line")
      .attr("d", valueline(data));

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
    .attr("class"), "y axis")
    .call(yAxis);
};
