import React from "react";
import { API } from "aws-amplify";
import { env } from "../constant";

export const Dev: React.FC = () => {
  return (
    <div className="App">
      <h1>api</h1>
      <button
        onClick={() => {
          fetch(env.apiGateway.URL || "").then(async (res) => {
            const text = await res.text();
            console.log(text);
          });
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
