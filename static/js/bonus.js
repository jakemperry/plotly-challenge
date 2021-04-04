function loadGauge(){

var data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: Object.values(currentMeta[0][6],
      title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
      gauge: {
        axis: { range: [null, 9.5], nticks: 10, tickwidth: 1, tickcolor: "black" },
        bar: { color: "black" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "black",
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
        threshold: {
          line: { color: "black", width: 4 },
          thickness: 0.75,
          value: 9
        }
      }
    }
  ];
  
  var layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "black", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data, layout);
}

loadGauge() 

  d3.select("#sample-metadata").on("change", loadGauge)