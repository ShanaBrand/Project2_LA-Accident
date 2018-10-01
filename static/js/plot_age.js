// Trace1 for the Greek Data
var trace1 = {
    x: ["30", "25", "24", "27", "26", "23", "35", "40", "28", "50", "22", "29", "31", "32", "21", "45", "33", "34", "20", "36", "37", "38", "41", "51", +
        "39", "42", "43", "46", "44", "47", "49", "19", "48", "55", "52", "52", "53", "54", "17", "56", "16", "57", "18", "60", "58", "59", "15"],
    y: [12688, 11948, 10548, 10315, 10216, 10210, 10209, 10207, 10194, 9802, 9780, 9546, 9062, 8777, 8688, 8311, 8295, 8069, 8024, 7634, 7388, 7298, 6001, +
        6989, 6909, 6710, 6626, 6625, 6510, 6491, 6369, 6359, 6185, 6001, 5888, 5702, 5530, 5090, 5032, 5032, 4754, 4622, 4593, 4533, 4216, 3695],

    // text: "here is some text",
    name: "Victim Age",
    type: "bar",
    // orientation: "h"
  };

// data
var data = [trace1];

// Reverse the array due to Plotly's defaults
// data = data.reverse();

  // Apply the group bar mode to the layout
  var layout = {
    title: "Victim Age",
    xaxis: { title: "Age" },
    yaxis: { title: "Number of Incidents" },
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("agePlot", data, layout);
