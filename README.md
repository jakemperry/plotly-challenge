# Plotly Challenge

### PseudoCode
1. Use the D3 Library to read in `samples.json`.
> Read through the `samples.json` file, and create a new list item in the dropdown select list using D3, which will be much faster and more adaptable than just writing in the html for the full dropdown list

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
- Use `sample_values` as the values for the bar chart.
- Use `otu_ids` as the labels for the bar chart.
- Use `otu_labels` as the overtext for the chart.
> Check the music streaming services example and the stock prices example from class.

3. Create a bubble chart that displays each sample.
- Use `otu_ids` for the x values.
- Use `sample_values` for the y values.
- Use `sample_values` for the marker size.
- Use `otu_ids` for the marker colors.
- use `otu_labels` for the text values.
> 

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

6. Update all of the plots any time that a new sample is selected.
> - Make an `init()` function that will plot the first individual's data as a default when the page is first loaded.
> - Add an `update()` function that runs any time there is a change to the dropdown selection.  This should take the individual's id and pass it into the function that makes the horizontal bar graph and the bubble plot.