var trace1 = {
    labels: ["Male", "Female", "X", "N", ],
    values: [254853, 165237, 9087, 5942],
    type: 'pie'
  };
  
  var data = [trace1];
  
  var layout = {
    title: " Victim Gender Pie Chart",
  };
  
  Plotly.newPlot("pie", data, layout);
