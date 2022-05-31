// import logo from "./logo.svg";
// import { env } from "./constant";
import "./App.css";
import { useState } from "react";

function App() {
  // console.log(env.apiGateway.REGION);
  // console.log(env.apiGateway.URL);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      {/* // */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(email);
          console.log(password);
        }}
      >
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <br />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
