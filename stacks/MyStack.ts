import { StackContext, Api, ViteStaticSite } from "@serverless-stack/resources";

const { DOMAIN, SUBDOMAIN } = process.env;

export function MyStack({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/lambda.handler",
    },
  });

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
    apiUrl: api.url,
    siteUrl: site.url,
  });
}
