import "./App.css";
import React, { useEffect, useState } from "react";
import ScatterPlot from "./components/ScatterPlot";
import DropdownMenu from "./components/DropdownMenu";
import Histogram from "./components/Histogram";
import MaterialTable from "./components/MaterialTable";
import Filter from "./components/Filter";

function App({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [filterMin, setFilterMin] = useState(Number.MIN_VALUE);
  const [filterMax, setFilterMax] = useState(Number.MAX_VALUE);
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [xAxis, setxAxis] = useState("");
  const [yAxis, setyAxis] = useState("");
  const [xAxisData, setxAxisData] = useState([]);
  const [yAxisData, setyAxisData] = useState([]);

  //Set Input Properties and Output Measurements
  useEffect(() => {
    if (data.length > 0) {
      setInputs(Object.keys(data[0][1]["inputs"]));
      setOutputs(Object.keys(data[0][1]["outputs"]));
    }
  }, [data]);

  // Alter Filtered Data
  useEffect(() => {
    let newFilteredData = data.filter(
      (experiment) => experiment[1]["inputs"][xAxis] !== 0
    );
    newFilteredData = newFilteredData.filter(
      (experiment) => experiment[1]["outputs"][yAxis] > filterMin
    );
    newFilteredData = newFilteredData.filter(
      (experiment) => experiment[1]["outputs"][yAxis] < filterMax
    );
    setFilteredData(newFilteredData);
  }, [xAxis, yAxis, filterMin, filterMax, data]);

  // Alter xData and yData
  useEffect(() => {
    const xData = filteredData.map((experiment) => {
      return experiment[1]["inputs"][xAxis];
    });
    const yData = filteredData.map((experiment) => {
      return experiment[1]["outputs"][yAxis];
    });

    // remove 0 values from xData and corresponding values from yData
    const indices = xData.map((element, index) => (element ? index : null));
    const filteredxData = indices
      .map((element) => xData[element])
      .filter((element) => element !== undefined);
    const filteredyData = indices
      .map((element) => yData[element])
      .filter((element) => element !== undefined);

    setxAxisData(filteredxData);
    setyAxisData(filteredyData);
  }, [xAxis, yAxis, filterMin, filterMax, filteredData]);

  const onSelectxAxis = (newxAxis) => {
    setxAxis(newxAxis);
  };

  const onSelectyAxis = (newyAxis) => {
    setyAxis(newyAxis);
  };

  const onSubmitFilter = (minValue, maxValue) => {
    if (minValue) {
      setFilterMin(minValue);
    } else {
      setFilterMin(Number.MIN_VALUE);
    }
    if (maxValue) {
      setFilterMax(maxValue);
    } else {
      setFilterMax(Number.MAX_VALUE);
    }
  };

  return (
    <div className="App">
      <div className="selectionDiv">
        <DropdownMenu
          type="X"
          menuItems={inputs}
          onSelectAxis={onSelectxAxis}
        />
        <DropdownMenu
          type="Y"
          menuItems={outputs}
          onSelectAxis={onSelectyAxis}
        />
        <Filter onSubmitFilter={onSubmitFilter} />
      </div>
      <div className="plotsDiv">
        <ScatterPlot
          xArray={xAxisData}
          yArray={yAxisData}
          xAxis={xAxis}
          yAxis={yAxis}
        />
        <Histogram input={xAxis} data={xAxisData} />
      </div>
      <MaterialTable data={filteredData} headers={inputs} measurement={yAxis} />
    </div>
  );
}

export default App;
