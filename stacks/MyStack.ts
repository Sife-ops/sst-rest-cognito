import {
  StackContext,
  Api,
  ViteStaticSite,
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

  const site = new ViteStaticSite(stack, "site", {
    path: "frontend",
    environment: {
      VITE_API_URL: api.url,
    },
    customDomain: {
      domainName: `${SUBDOMAIN}.${DOMAIN}`,
      domainAlias: `www.${SUBDOMAIN}.${DOMAIN}`,
      hostedZone: `${DOMAIN}`,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId || '',
    UserPoolClientId: auth.userPoolClientId,
    SiteUrl: site.url,
  });
}
