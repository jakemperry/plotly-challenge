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
var metaValues = []
var metaKeys = []

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
    
    //Set up data for horizontal bar chart.  Since there is only one trace, use [square brackets] to 
    //save a step
    hbarData = [{
        type: 'bar', //This makes the chart a bar chart
        x: sample_values.slice(0,10).sort((a,b) => a - b), //Ascending values from X axis upward on chart
        y: hLabels,  //Text labels on bar chart
        text: currentSample[0].otu_labels.slice(0,10).reverse(), //Hover text for each bar, limit 10
        orientation: 'h' //This makes the chart a horizontal bar chart
      }];

    //Add titles to the chart and axes using layout JSON
    var layout={
        title:  { text: `Top 10 OTU for Test Subject No. ${currentID}`, font: { size: 24 } },
        xaxis: {
            title: 'OTU Count'
        },
        yaxis: {
            title: 'OTU ID'
        },
        font: { color: "black", family: "Arial" }
    }

    //Plot the horizontal bar chart
    Plotly.newPlot('bar', hbarData, layout);

    //Make an array of bubble sizes.  Exponent of 1.7 to allow larger
    //bacteria counts to have significantly larger bubble sizes
    sample_values.forEach((d,i) => {
        bubbleSizes[i] = d ** 1.7;
    })

    //Set up bubble chart data
    var bubbles = [{
        x: otu_ids, //otu id number plotted along X axix
        y: sample_values,  //count of otu's for each individual ID
        text: currentSample[0].otu_labels, //hover text shows otu label names
        mode: 'markers',  //Use large circles as markers
        marker: {
            size: bubbleSizes, //Use exponentially scaled bubble sizes
            sizemode: 'area',
            color: otu_ids  //Use otu_ids as basis for color.  Colors change as otu_id changes
        }
    }];

    //Add titles to the bubble chart and axes using layout JSON
    var bubbleLayout = {
        title: {text : `All OTU Present for Test Subject No. ${currentID}`, font: {size: 24}},
        xaxis: {
            title: 'OTU ID Number'
        },
        yaxis: {
            title: 'OTU Count'
        },
        font: {color: "black", family: "Arial"}
    }

    //Plot the bubble chart
    Plotly.newPlot('bubble', bubbles, bubbleLayout);
    
    //Get metadata that matches current individual ID
    currentMeta = samplesData.metadata.filter(filterMeta)

    //Get all the keys from the metadata JSON
    metaKeys = Object.keys(currentMeta[0]);

    //Get all the values from the metadata JSON
    metaValues = Object.values(currentMeta[0]);
    console.log(metaKeys)
    console.log(metaValues)

    //Selec the sample-metadata id in index.html
    d3.select('#sample-metadata')

    //Write html to show the key and value for the current set of metadata
        .html(`<p>${metaKeys[0]}: ${metaValues[0]}
        <br>${metaKeys[1]}: ${metaValues[1]}
        <br>${metaKeys[2]}: ${metaValues[2]}
        <br>${metaKeys[3]}: ${metaValues[3]}
        <br>${metaKeys[4]}: ${metaValues[4]}
        <br>${metaKeys[5]}: ${metaValues[5]}
        <br>${metaKeys[6]}: ${metaValues[6]}</p>`)
}

//Load up the data
d3.json('samples.json').then(function init(data){

    //Set variable value equal to whatever is loaded from the samples JSON
    samplesData = data 

    //Use d3 to create options for dropdown menu
    //(this is something we learned in lessons/class after this homework was assigned, this seems like 
    //a better alternative than manually entering all of the individual ID numbers)
    d3.select('#selDataset').selectAll('option')  
        .data(data.names)
            .enter()
            .append("option")
            .attr('value',d => d)
            .text(d => d);
    console.log(samplesData)

    //Now that the drop down menu is populated, use loadCharts() to get the current selection
    //of the dropdown menu and create charts/load metadata for the first ID in the samples JSON

    loadCharts(); //Run the function to update the charts
    loadGauge(); //Load in the gauge indicator from bonus.js
})


//Set an event handler for any time the dropdown menu selection changes.  This will re-run loadCharts()

d3.selectAll("#selDataset").on("change", function runAll(){
    loadCharts();  //Run the function to update the charts
    loadGauge();  //Load in the gauge indicator from bonus.js
})

