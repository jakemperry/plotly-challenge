//Update the dropdown menu with all of the individual ids.
var samplesData = [];
var currentID = "";
var dropdownMenu = d3.select("#selDataset");
var currentSample = [];
var hbarData = [];
var sample_values = [];
var otu_ids = [];
var otu_ids_H=[];
var hLabels = [];
var sample_values_H=[]

function filterSamples(sample){
    return sample.id === currentID;
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
    console.log("currentSample")
    console.log(currentSample)
    sample_values = currentSample[0].sample_values
    otu_ids = currentSample[0].otu_ids
    otu_ids_H = otu_ids.slice(0,10).reverse()
    otu_ids_H.forEach((d,i)=> {
        hLabels[i] = `OTU ${d}`;
    })
    
    hbarData = [{
        type: 'bar',
        x: sample_values.slice(0,10).sort((a,b) => a - b),
        y: hLabels,
        text: currentSample[0].otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];
    var layout = {

    }
      
      Plotly.newPlot('bar', hbarData);
})





function reloadCharts() {
    dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    currentID = dropdownMenu.property("value");
    console.log(currentID)
    currentSample = samplesData.samples.filter(filterSamples)
    console.log("currentSample")
    console.log(currentSample)
    sample_values = currentSample[0].sample_values
    sample_values_H = sample_values.slice(0,10).sort((a,b) => a - b)
    otu_ids = currentSample[0].otu_ids
    otu_ids_H = otu_ids.slice(0,10).reverse()
    otu_ids_H.forEach((d,i)=> {
        hLabels[i] = `OTU ${d}`;
    })
    
    hbarData = [{
        type: 'bar',
        x: sample_values_H,
        y: hLabels,
        text: currentSample[0].otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];

      Plotly.newPlot('bar', hbarData);
}



//2. Create a horizontal bar chart with the selected ID


// On change to the DOM, call getData()
;

// Function called by DOM changes




// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("bar", "hbarData", [hbarData]);
}


d3.selectAll("#selDataset").on("change", reloadCharts)
// function horizontalBar(data){d3.json('samples.json').then(function show(data){
//     console.log(data)
    

//     });

// }

// horizontalBar()
