import React from "react";
import { API, Auth } from "aws-amplify";

export const Dev: React.FC = () => {
  React.useEffect(() => {
    // console.log(Auth.Credentials);
    Auth.currentAuthenticatedUser().then((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="App">
      <h1>api</h1>
      <button
        onClick={async () => {
          const res = await API.get("temp", "/public", {});
          console.log(res);
        }}
      >
        public
      </button>
      <br />

      <button
        onClick={async () => {
          const res = await API.get("temp", "/private", {});
          console.log(res);
        }}
      >
        private
      </button>
    </div>
  );
};
