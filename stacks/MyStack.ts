import {
  StackContext,
  Api,
  // ViteStaticSite,
  ReactStaticSite,
  Auth,
} from "@serverless-stack/resources";

const { DOMAIN, SUBDOMAIN } = process.env;

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    defaults: {
      authorizer: "iam",
    },
    routes: {
      "GET /": {
        function: "functions/lambda.handler",
        authorizer: "none",
      },
      "GET /private": "functions/private.handler",
    },
  });

  const auth = new Auth(stack, "auth", {
    login: ["email"],
  });

  auth.attachPermissionsForAuthUsers([api]);

  // const site = new ViteStaticSite(stack, "site", {
  //   path: "frontend",
  //   environment: {
  //     VITE_REGION: stack.region,
  //     VITE_API_URL: api.url,
  //     VITE_USER_POOL_ID: auth.userPoolId,
  //     VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
  //     VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
  //   },
  //   customDomain: {
  //     domainName: `${SUBDOMAIN}.${DOMAIN}`,
  //     domainAlias: `www.${SUBDOMAIN}.${DOMAIN}`,
  //     hostedZone: `${DOMAIN}`,
  //   },
  // });

  const site = new ReactStaticSite(stack, "site", {
    path: "frontend",
    environment: {
      REACT_APP_REGION: stack.region,
      REACT_APP_API_URL: api.url,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
    },
    customDomain: {
      domainName: `${SUBDOMAIN}.${DOMAIN}`,
      domainAlias: `www.${SUBDOMAIN}.${DOMAIN}`,
      hostedZone: `${DOMAIN}`,
    },
  });

  stack.addOutputs({
    Region: stack.region,
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId || "",
    UserPoolClientId: auth.userPoolClientId,
    SiteUrl: site.url,
  });
}
