import { useEffect } from "react";
import "./App.css";
import { env } from "./constant";

function App() {
  useEffect(() => {
    fetch(env.apiGateway.URL).then(async (res) => {
      const text = await res.text();
      console.log(text);
    });
  }, []);

  return (
    <div className="App">
      {/* // */}
      hello
    </div>
  );
}

export default App;
