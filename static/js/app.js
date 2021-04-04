//Declare variables with placeholders
var samplesData = [];
var currentID = "";
var currentSample = [];
var currentMeta = [];
var hbarData = [];
var sample_values = [];
var otu_ids = [];
var otu_ids_H=[];
var hLabels = [];
var sample_values_H=[]
var bubbleSizes = []

//Declare variables used to bind d3 to parts of the DOM
var dropdownMenu = d3.select("#selDataset");
var demoPanel = d3.select('#sample-metadata').selectAll('p');

//Create a function to filter samples
function filterSamples(sample){
    return sample.id === currentID;
}

//Create a function to filter metadata (must parseInt since IDs are integers in the metadata)
function filterMeta(metadata){
    return metadata.id === parseInt(currentID);
}

//Create a function to load charts.  If charts already exist on the page, this will overwrite
//them with new charts
function loadCharts() {
    // Get the current individual ID based on selection from the dropdown menu
    currentID = dropdownMenu.property("value")
    console.log(currentID)

    //Filter for the samples relevant to the individual ID
    currentSample = samplesData.samples.filter(filterSamples)
    console.log(currentSample)

    //Get sample values from current set of sample data
    sample_values = currentSample[0].sample_values

    //Get otu_ids from current set of sample data
    otu_ids = currentSample[0].otu_ids

    //Make a set of otu_ids for the horizontal bar chart.  Limit to 10, and reverse the order to match 
    //'bottom to top' chart population for horizontal bar chart.
    otu_ids_H = otu_ids.slice(0,10).reverse()

    //Make a set of labels that puts 'OTU' in front of each otu_id for the horizontal bar chart.
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

    sample_values.forEach((d,i) => {
        bubbleSizes[i] = d ** 1.7;
    })
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
    
    currentMeta = samplesData.metadata.filter(filterMeta)
    var metaKeys = Object.keys(currentMeta[0]);
    var metaValues = Object.values(currentMeta[0]);
    console.log(metaKeys)
    console.log(metaValues)
    d3.select('#sample-metadata')
        .html(`<p>${metaKeys[0]}: ${metaValues[0]}
        <br>${metaKeys[1]}: ${metaValues[1]}
        <br>${metaKeys[2]}: ${metaValues[2]}
        <br>${metaKeys[3]}: ${metaValues[3]}
        <br>${metaKeys[4]}: ${metaValues[4]}
        <br>${metaKeys[5]}: ${metaValues[5]}
        <br>${metaKeys[6]}: ${metaValues[6]}</p>`)

    Plotly.newPlot('bar', hbarData);
    Plotly.newPlot('bubble', bubbles);
}

//Load up the data
d3.json('samples.json').then(function init(data){
    samplesData = data
    d3.select('#selDataset').selectAll('option')
        .data(data.names)
            .enter()
            .append("option")
            .attr('value',d => d)
            .text(d => d);
    console.log(samplesData)
    loadCharts()
})

d3.selectAll("#selDataset").on("change", loadCharts)

