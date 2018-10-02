// alert('visuals.js!');
// console.log("I am the plots.js!  I am running!");

function yearlyChart(){
  d3.json('/accidents/byYear').then((data) => {
    const year_occur = data.year_occur;
    const num_acc = data.num_accidents;

    var layout = {
      margin:{t:0},
      hovermode:"closest",
      xaxis:{title:"YEAR"},
      yaxis:{title:"NUMBER OF ACCIDENTS"}
    };
    var data = [{
      x: year_occur,
      y: num_acc,
      text: year +" "+num_acs,
      mode: "markers",
      marker: {
        size: 'y'/1000,
        color: 'y'/1000,
        colorscale: "Earth"
    }
  }];
  Plotly.plot("bubble", data,layout);
});
}


function sexChart(){
  d3.json('/accidents/bySex').then((data) => {
    const victim_sex = data.victim_sex;
    const num_acc = data.num_accidents;

    var pielayout = {
      margin: {t:0, l:0},
      title: "NUMBER OF ACCIDENTS BY Victim_Sex"
    };

    var data = [{
      values: victim_sex.slice(0,len(num_acc)),
      labels: num_acc.slice(0,len(num_acc)),
      hovertext: num_acc.slice(0,len(num_acc)),
      hover_info: "hovertext",
      type:'pie'
    }];
    Plotly.plot("pie", data,layout);
  });
}


function areaChart(){
  d3.json(`/accidents/byArea`).then((data) => {
    const area_name = data.area_name;
    const num_acc = data.num_accidents;

    var layout = {
      margin:{t:0},
      hovermode:"closest",
      xaxis:{title:"LOS ANGELES AREA"},
      yaxis:{title:"NUMBER OF ACCIDENTS"}
    };
    var data = [{
      x: area_name,
      y: num_acc,
      text: 'x',
      mode: "markers",
      marker: {
        size: 'y'/1000,
        color: 'y'/1000,
        colorscale: "Virdis"
    }
  }];
  Plotly.plot("bubbles", data,layout);
});
}



function descentChart(){
  d3.json(`/accidents/byDescent`).then((data) => {
    const descent = data.victtim_descent;
    const num_acc = data.num_accidents;

    var layout = {
      margin:{t:0},
      hovermode:"closest",
      xaxis:{title:"LOS ANGELES AREA"},
      yaxis:{title:"NUMBER OF ACCIDENTS"}
    };
    var data = [{
      x: descent,
      y: num_acc,
      text: 'x',
      mode: "markers",
      marker: {
        size: 'y'/1000,
        color: 'y'/1000,
        colorscale: "Virdis"
    }
  }];
  Plotly.plot("bar", data,layout);
});
}




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("/years").then((sampleYears) => {
    sampleYears.forEach((yearo) => {
      selector
      .append("option")
      .text(yearo)
      .property("value", yearo);
      });
      yearlyChart();
      sexChart();
      areaChart();
      descentChart();
  });
}

// Initialize the dashboard
init();
