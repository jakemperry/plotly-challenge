//1. Update the dropdown menu with all of the individual ids.
function populateDropDown(){
    d3.json('samples.json').then(function updateList(data){
        // console.log(data)
        d3.select('#selDataset').selectAll('option')
            .data(data.names)
                .enter()
                .append("option")
                .attr('value',d => d)
                .text(d => d)
    })
}
populateDropDown()

var currentID=""
var samplesData = []
var currentSample = []
d3.json('samples.json').then(function loadData(d){
    samplesData = d;
})

function filterSamples(sample){
    return sample.id === currentID;
}
//2. Create a horizontal bar chart with the selected ID


// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  currentID = dropdownMenu.property("value");
  console.log(currentID)
  currentSample = samplesData.samples.filter(filterSamples)
}

var exampledata = [{
    type: 'bar',
    x: [20, 14, 23],
    y: ['giraffes', 'orangutans', 'monkeys'],
    orientation: 'h'
  }];
  
  Plotly.newPlot('bar', exampledata);

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}


// function horizontalBar(data){d3.json('samples.json').then(function show(data){
//     console.log(data)
    

//     });

// }

// horizontalBar()
