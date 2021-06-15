import Plot from "react-plotly.js";

function Histogram({ input, data }) {
  return (
    <Plot
      data={[
        {
          x: data,
          type: "histogram",
          mode: "markers",
          marker: { color: "#00CD97" },
        },
      ]}
      layout={{
        width: 640,
        height: 480,
        title: `${data.length} Formulations Total`,
        xaxis: { title: { text: input } },
        yaxis: { title: { text: "Number of Formulations" } },
        paper_bgcolor: "rgb(255,255,255)",
        plot_bgcolor: "#E5EDF7",
      }}
    />
  );
}

export default Histogram;
