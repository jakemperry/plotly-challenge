//1. Update the dropdown menu with all of the individual ids.
function populateDropDown(){
    d3.json('samples.json').then(function updateList(data){
        console.log(data.names)
        d3.select('#selDataset').selectAll('option')
            .data(data.names)
                .enter()
                .append("option")
                .attr('value',d => d)
                .text(d => d)
    })
}
populateDropDown()
// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'us') {
//       data = us;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }


// function horizontalBar(data){d3.json('samples.json').then(function show(data){
//     console.log(data)
    

//     });

// }

// horizontalBar()
