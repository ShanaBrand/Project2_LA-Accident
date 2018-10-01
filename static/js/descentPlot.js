// Trace1 for the Greek Data
var trace1 = {
    y: ["Hispanic", "White", "Other", "Black", "Uknown", "Other Asian"],
    x: [159772, 105149, 65437, 56719, 18609, 16442],
    // text: "here is some text",
    name: "Victim Descent",
    type: "bar",
    orientation: "h"
  };

// data
var data = [trace1];

// Reverse the array due to Plotly's defaults
data = data.reverse();

  // Apply the group bar mode to the layout
  var layout = {
    title: "Victim Descent",
    xaxis: { title: "Number of Incidents" },
    yaxis: { title: "Descent" },
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
