// @TODO: YOUR CODE HERE!
// Import data from an external CSV file
d3.csv("data/data.csv").then(function(healthData) {
  
    // print health data
    console.log(healthData);

    // data that you want to plot, I've used separate arrays for x and y values
    var xdata = [healthData.smokes];
    var ydata = [healthData.age];

    // size and margins for the chart
    var margin = {top: 20, right: 15, bottom: 60, left: 60};
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // x and y scales, I've used linear here but there are other options
    // the scales translate data values to pixel values for you
    var x = d3.scale.linear()
            .domain([0, d3.max(xdata)])  // the range of the values to plot
            .range([ 0, width ]);        // the pixel range of the x-axis

    var y = d3.scale.linear()
            .domain([0, d3.max(ydata)])
            .range([ height, 0 ]);

    // the chart object, includes all margins
    var chart = d3.select('article')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .attr('class', 'chart')

    // the main object where the chart and axis will be drawn
    var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'main')   

    // draw the x axis
    var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

    main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .attr('class', 'main axis date')
    .call(xAxis);

    // draw the y axis
    var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

    main.append('g')
    .attr('transform', 'translate(0,0)')
    .attr('class', 'main axis date')
    .call(yAxis);

    // draw the graph object
    var g = main.append("svg:g"); 

    g.selectAll("scatter-dots")
    .data(ydata)  // using the values in the ydata array
    .enter().append("svg:circle")  // create a new circle for each value
        .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
        .attr("cx", function (d,i) { return x(xdata[i]); } ) // translate x value
        .attr("r", 10) // radius of circle
        .style("opacity", 0.6); // opacity of circle
}

// Not finished. Would work to redefine xdata and ydata. Create an array that is based solely on
// Average of state age and smoking consumption. This function should result with 
// 50 data points in each array.
// Also need to figure out labeling/legend for state circles.