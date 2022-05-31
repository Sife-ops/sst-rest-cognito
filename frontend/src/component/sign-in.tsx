import { Auth } from "aws-amplify";
import { useState } from "react";

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <h1>sign in</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await Auth.signIn(email, password);
            // todo: don't use reload
            window.location.reload();
          } catch (e) {
            console.log(e);
          }
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
};
