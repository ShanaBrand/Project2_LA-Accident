function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  var url = `/metadata/${sample}`;
  console.log(url)
  
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then((data)=>{
  // var data = [data];
  // console.log(data)
  //})
  // Use d3 to select the panel with id of `#sample-metadata`
  metadataPanel =d3.select("#sample-metadata")
  
  // Use `.html("") to clear any existing metadata
  metadataPanel.html("");
  
  
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  Object.entries(data).forEach(([key,value])=>{
      metadataPanel.append("h6").text(`${key}:${value}`);
    });
  
    // BONUS: Build the Gauge Chart
  });
  }
  
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  
  function buildCharts(sample) {
  urlS = `/samples/${sample}`;
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(urlS).then((data) =>{
  /*   extract = [response];
    console.log(extract)
    topTen = extract.slice(0,10) */
    // Define values
    //data.sort(function(obj1,obj2){
    //  return obj1.sample_values - obj2.sample_values
//});
    const otu_ids = data.otu_ids;
    const sample_values = data.sample_values;
    const otu_labels = data.otu_labels;
    console.log(sample_values);

    const topSamp = sample_values.slice(0,10);
    const top_id = otu_ids.slice(0,10);
    const top_labels = otu_labels.slice(0,10);

  
  var pie_data = [{
      values: topSamp,
      labels: top_id,
      hoverinfo: top_labels,
      type: 'pie',
    }];
  
    var layout = {
      height: 800,
      width: 700
    };
    pieDiv = d3.select("#pie")
    //pieDiv.html("");
    //Plotly.plot('pie', pie_data),layout);
    Plotly.plot("pie", pie_data, layout);
  
    var bub_data = [{
      x: otu_ids,
      y: sample_values,
      mode:'markers',
      marker:{
        size: sample_values,
        color: otu_ids,
        text: otu_labels
      }
    }];

    var bub_layout = {
      title: 'Belly Button BioDiversity',
      showlegend: true,
      height: 600,
      width: 1000
    }

    bubDiv = d3.select("#bubble")
    Plotly.plot("bubble", bub_data,bub_layout);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  });
  }
  function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  }
  function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  }
  // Initialize the dashboard
  init();
  
  
  