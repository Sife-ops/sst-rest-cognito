import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "./component/sign-in";
import { SignUp } from "./component/sign-up";
import { Dev } from "./component/dev";
import { env } from "./constant";
import { useEffect } from "react";

const Landing: React.FC = () => {
  return <div>landing</div>;
};

function App() {
  useEffect(() => {
    console.log(env);
  }, []);

  return (
    <div>
      <ul>
        <li>
          <a href="/">landing</a>
        </li>
        <li>
          <a href="/signin">sign in</a>
        </li>
        <li>
          <a href="/signup">sign up</a>
        </li>
        <li>
          <a href="/dev">dev</a>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
