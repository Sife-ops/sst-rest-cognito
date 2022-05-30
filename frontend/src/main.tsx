import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { env } from "./constant";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: env.cognito.REGION,
    userPoolId: env.cognito.USER_POOL_ID,
    identityPoolId: env.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: env.cognito.USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: "temp",
        endpoint: env.apiGateway.URL,
        region: env.apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
