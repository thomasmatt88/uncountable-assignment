import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@fontsource/roboto";

// looks for data.json in public by default
fetch("data.json", {
  headers: {
    "Content-Type": "applications/json",
    Accept: "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (myJson) {
    const data = Object.keys(myJson).map((key) => [key, myJson[key]]);
    ReactDOM.render(
      <React.StrictMode>
        <App data={data} />
      </React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch((err) => {
    ReactDOM.render(
      <React.StrictMode>
        <h1>Could not load data.json</h1>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
