console.log("Welcome to our Dashboard, We are getting data from MYSQL  database and generating Javascript Plotly!!");

function yearlyChart(){
 d3.json(`/accidents/byYear`).then((data) => {
  const year_occur = data.year_occur;
  const num_acc = data.num_accidents;
  const col_id = [120,125,130,135,140,145,150,155]

  var layout = {
   margin:{t:0},
   hovermode:"closest",
   xaxis:{title:"Year"}, 
   yaxis:{title:"Number of Accidents"}
  };
  var data = [{
   x: year_occur,
   y: num_acc, 
   text: x,
   mode: "markers",
   marker: {
    size: y/1000,
    color: col_id
   // colorscale: "Virdis"
  }
 }];
 Plotly.newPlot("bubble", data,layout);
});
}


function sexChart(){
 d3.json(`/accidents/bySex`).then((data) => {
  const victim_sex = data.victim_sex;
  const num_acc = data.num_accidents;

  var pielayout = {
   margin:{t:0, l:0}
  }

  var data = [{
   values: victim_sex.slice(0,len(num_acc)),
   labels: num_acc.slice(0,len(num_acc)), 
   hovertext: num_acc.slice(0,len(num_acc)),
   hover_info: "hovertext",
   type:'pie'
  }];
  Plotly.newPlot("pie", data,pielayout);
});
}


function areaChart(){
 d3.json(`/accidents/byArea`).then((data) => {
  const area_name = data.area_name;
  const num_acc = data.num_accidents;

  var layout = {
   margin:{t:0},
   hovermode:"closest",
   xaxis:{title:"Area in Los Angeles"}, 
   yaxis:{title:"Number of Accidents"}
  };
  var data = [{
   x: area_name,
   y: num_acc, 
   text: x,
   mode: "markers",
   marker: {
    size: y/1000,
    color: y/1000,
    colorscale: "YIOrRd"
  }
 }];
 Plotly.newPlot("bubbles", data, layout);
});
}


function ageChart(){
 d3.json(`/accidents/byAge`).then((data) => {
  const age = data.victim_age;
  const num_acc = data.num_accidents;

  var layout = {
   margin:{t:0},
   hovermode:"closest",
   xaxis:{title:"Victim’s Age Group"}, 
   yaxis:{title:"Number of Accidents"}
  };
  var data = [{
   x: age,
   y: num_acc, 
   type: 'bar',
   text: x,
   mode: "markers",
   marker: {
    color: y/1000,
    colorscale: "Portland"
  }
 }];
 Plotly.newPlot("bar", data, layout);
});
}

function descentChart(){
 d3.json(`/accidents/byDescent`).then((data) => {
  const descent = data.victim_descent;
  const num_acc = data.num_accidents;

  var layout = {
   margin:{t:0},
   hovermode:"closest",
   xaxis:{title:"Victim’s Descent"}, 
   yaxis:{title:"Number of Accidents"}
  };
  var data = [{
   x: descent,
   y: num_acc, 
   type: 'bar',
   text: x,
   mode: 'lines'
 }];
 Plotly.newPlot("line", data, layout);
});
}



function init() {
 // Grab a reference to the dropdown select element
 var selector = d3.select("#selDataset");
 // Use the list of sample names to populate the select options
 d3.json("/years").then((sampleYears) => {
  sampleYears.forEach((yr) => {
   selector
   .append("option")
   .text(yr)
   .property("value", yr);
   });
   yearlyChart();
   sexChart();
   areaChart();
   ageChart();
   descentChart();

 });

}

init();
