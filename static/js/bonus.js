var data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: parseInt(metaValues[6]),
      title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
      delta: { reference: 4, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 9.5], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [null, 0.5], color: "red" },
          { range: [0.5, 250], color: "cyan" },
          { range: [1.5, 250], color: "cyan" },
          { range: [2.5, 250], color: "cyan" },
          { range: [3.5, 250], color: "yellow" },
          { range: [4.5, 250], color: "cyan" },
          { range: [5.5, 250], color: "cyan" },
          { range: [6.5, 250], color: "cyan" },
          { range: [7.5, 250], color: "cyan" },
          { range: [8.5, 9.5], color: "green" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
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
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data, layout);