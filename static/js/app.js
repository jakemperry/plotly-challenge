//Update the dropdown menu with all of the individual ids.
var samplesData = [];
var currentID = "";
var dropdownMenu = d3.select("#selDataset");
var demoPanel = d3.select('#sample-metadata').selectAll('p');
var currentSample = [];
var currentMeta = [];
var hbarData = [];
var sample_values = [];
var otu_ids = [];
var otu_ids_H=[];
var hLabels = [];
var sample_values_H=[]
var bubbleSizes = []

function filterSamples(sample){
    return sample.id === currentID;
}

function filterMeta(metadata){
    return metadata.id === parseInt(currentID);
}

d3.json('samples.json').then(function init(data){
    samplesData = data
    d3.select('#selDataset').selectAll('option')
        .data(data.names)
            .enter()
            .append("option")
            .attr('value',d => d)
            .text(d => d);
    console.log(samplesData)
    dropdownMenu = d3.select("#selDataset")
    

    currentID = dropdownMenu.property("value")
    console.log(currentID)
    currentSample = samplesData.samples.filter(filterSamples)
    currentMeta = samplesData.metadata.filter(filterMeta)
    var metaKeys = Object.keys(currentMeta[0]);
    var metaValues = Object.values(currentMeta[0]);
    console.log(metaKeys)
    console.log(metaValues)
    // d3.select('#sample-metadata').selectAll('p')
    //     .data(metaKeys, metaValues)
    //         .enter()
    //         .append('p')
    //         .text((a,b) => `${a}: ${b}`);
    console.log("currentSample")
    console.log(currentSample)
    console.log(currentMeta)
    sample_values = currentSample[0].sample_values
    otu_ids = currentSample[0].otu_ids
    otu_ids_H = otu_ids.slice(0,10).reverse()
    otu_ids_H.forEach((d,i)=> {
        hLabels[i] = `OTU ${d}`;
    })
    sample_values.forEach((d,i) => {
        bubbleSizes[i] = d ** 1.7;
    })
    
    hbarData = [{
        type: 'bar',
        x: sample_values.slice(0,10).sort((a,b) => a - b),
        y: hLabels,
        text: currentSample[0].otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];

      var bubbles = [{
        x: otu_ids,
        y: sample_values,
        text: currentSample[0].otu_labels,
        mode: 'markers',
        marker: {
          size: bubbleSizes,
          sizemode: 'area',
          color: otu_ids
        }
      }];
    
      demoPanel.text = `id: ${currentMeta.id}`
      
      Plotly.newPlot('bar', hbarData);
      Plotly.newPlot('bubble', bubbles);
})





function reloadCharts() {
    dropdownMenu = d3.select("#selDataset");

    currentID = dropdownMenu.property("value")
    console.log(currentID)
    currentSample = samplesData.samples.filter(filterSamples)
    console.log("currentSample")
    console.log(currentSample)
    sample_values = currentSample[0].sample_values
    otu_ids = currentSample[0].otu_ids
    otu_ids_H = otu_ids.slice(0,10).reverse()
    otu_ids_H.forEach((d,i)=> {
        hLabels[i] = `OTU ${d}`;
    })
    sample_values.forEach((d,i) => {
        bubbleSizes[i] = d ** 1.7;
    })
    
    hbarData = [{
        type: 'bar',
        x: sample_values.slice(0,10).sort((a,b) => a - b),
        y: hLabels,
        text: currentSample[0].otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];

      var bubbles = [{
        x: otu_ids,
        y: sample_values,
        text: currentSample[0].otu_labels,
        mode: 'markers',
        marker: {
          size: bubbleSizes,
          sizemode: 'area',
          color: otu_ids
        }
      }];
    
      
      Plotly.newPlot('bar', hbarData);
      Plotly.newPlot('bubble', bubbles);
}


d3.selectAll("#selDataset").on("change", reloadCharts)

