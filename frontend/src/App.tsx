import { useEffect, useState } from "react";
import "./App.css";
import { env } from "./constant";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch(env.apiGateway.URL).then(async (res) => {
      const text = await res.text();
      console.log(text);
    });
  }, []);

  return (
    <div className="App">
      {/* // */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("ree");
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
