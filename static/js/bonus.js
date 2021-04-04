//Create a function to build the gauge
function loadGauge(){
  //Set up gauge data, based on example from Plotly
  var data = [
      {
        type: "indicator",
        mode: "gauge+number", 
        value: metaValues[6],  //Loaded from the current set of subject metadata
        title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
        gauge: {
          // Make 10 ticks, one for each number 0 through 9
          axis: { range: [null, 9.5], nticks: 10, tickwidth: 1, tickcolor: "black" },
          bar: { color: "purple" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "black",
          // Add steps to show gradual change in color as the gauge value increases.  Outlines
          // on the steps give a cleaner look
          steps: [
            { range: [0, 0.5], color: "red", text:"0", line: {color: "black", width: 1}},
            { range: [0.5, 1.5], color: "red" , line: {color: "black", width: 1}},
            { range: [1.5, 2.5], color: "orange", line: {color: "black", width: 1} },
            { range: [2.5, 3.5], color: "orange", line: {color: "black", width: 1} },
            { range: [3.5, 4.5], color: "yellow" , line: {color: "black", width: 1}},
            { range: [4.5, 5.5], color: "yellow" , line: {color: "black", width: 1}},
            { range: [5.5, 6.5], color: "green" , line: {color: "black", width: 1}},
            { range: [6.5, 7.5], color: "green" , line: {color: "black", width: 1}},
            { range: [7.5, 8.5], color: "green" , line: {color: "black", width: 1}},
            { range: [8.5, 9.5], color: "green" , line: {color: "black", width: 1}}
          ],

          // The threshold of the gauge shows a maximum value to expect from the gauge
          threshold: {
            line: { color: "black", width: 4 },
            thickness: 0.75,
            value: 9
          }
        }
      }
  ];
    
  var layout = {
    width: 450,
    height: 300,
    margin: { t: 80, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "black", family: "Arial" }
  };
    
  // Add the chart to the DOM
  Plotly.newPlot('gauge', data, layout);
}
