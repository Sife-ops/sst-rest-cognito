// import React from "react";
// import logo from "./logo.svg";

import "./App.css";
import { env } from "./constant";

function App() {
  console.log(env.apiGateway.REGION);
  console.log(env.apiGateway.URL);

  return (
    <div className="App">
      {/* // */}
      hello
    </div>
  );
}

export default App;
