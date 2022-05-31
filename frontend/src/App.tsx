import "./App.css";
import { Dev } from "./component/dev";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SignIn } from "./component/sign-in";
import { SignUp } from "./component/sign-up";

const Landing: React.FC = () => {
  return <div>landing</div>;
};

function App() {
  const nav = useNavigate();

  return (
    <div>
      <ul>
        <li onClick={() => nav("/")}>landing</li>
        <li onClick={() => nav("/signin")}>sign in</li>
        <li onClick={() => nav("/signup")}>sign up</li>
        <li onClick={() => nav("/dev")}>dev</li>
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
