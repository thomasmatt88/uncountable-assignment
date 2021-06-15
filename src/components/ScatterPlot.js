import Plot from "react-plotly.js";

function ScatterPlot({ xArray, yArray, xAxis, yAxis }) {
  const titleString =
    xAxis && yAxis ? `Scatter Plot of ${xAxis} and ${yAxis}` : null;
  return (
    <Plot
      data={[
        {
          x: xArray,
          y: yArray,
          type: "scatter",
          mode: "markers",
          marker: { color: "#FCA769" },
        },
      ]}
      layout={{
        width: 640,
        height: 480,
        title: titleString,
        xaxis: { title: { text: xAxis } },
        yaxis: { title: { text: yAxis } },
        paper_bgcolor: "rgb(255,255,255)",
        plot_bgcolor: "#E5EDF7",
      }}
    />
  );
}

export default ScatterPlot;
