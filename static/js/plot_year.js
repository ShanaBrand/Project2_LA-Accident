// Trace1 for the Greek Data
var trace1 = {
    x: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"],
    y: [39858, 41661, 41836, 40839, 42509, 46965, 51226, 52555],

    // text: "here is some text",
    name: "Frequency by Year",
    type: "scatter",

  };

// data
var data = [trace1];


  // Apply the group bar mode to the layout
  var layout = {
    title: "Frequency by Year",
    xaxis: { title: "Year" },
    yaxis: { title: "Number of Incidents" },
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("yearPlot", data, layout);
