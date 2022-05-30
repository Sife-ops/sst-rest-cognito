import { useEffect } from "react";
import "./App.css";

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(apiUrl).then(async (res) => {
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
