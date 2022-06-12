import {
  Api,
  Auth,
  Bucket,
  ReactStaticSite,
  StackContext,
  Table,
} from '@serverless-stack/resources';

const { DOMAIN, SUBDOMAIN } = process.env;

export function MyStack({ stack }: StackContext) {
  const importBucket = new Bucket(
    stack,
    'import-bucket'
    // {
    //   notifications: {
    //     myNotification: 'src/notification.main',
    //   },
    // }
  );

  const table = new Table(stack, 'table', {
    fields: {
      pk: 'string',
      sk: 'string',
      bookmark: 'string',
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    globalIndexes: {
      categoryBookmarkIndex: {
        partitionKey: 'bookmark',
        sortKey: 'sk',
      },
    },
  });

  const api = new Api(stack, 'api', {
    defaults: {
      authorizer: 'iam',
      function: {
        environment: {
          tableName: table.tableName,
        },
      },
    },
    routes: {
      'POST /private': 'functions/private.handler',
      'GET /public': {
        function: 'functions/public.handler',
        authorizer: 'none',
      },
    },
  });
  api.attachPermissions([table]);

  const auth = new Auth(stack, 'auth', {
    login: ['email'],
  });
  auth.attachPermissionsForAuthUsers([api]);

  const site = new ReactStaticSite(stack, 'site', {
    path: 'frontend',
    environment: {
      REACT_APP_REGION: stack.region,
      REACT_APP_API_URL: api.url,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || '',
    },
    customDomain: {
      domainName: `${SUBDOMAIN}.${DOMAIN}`,
      domainAlias: `www.${SUBDOMAIN}.${DOMAIN}`,
      hostedZone: `${DOMAIN}`,
    },
  });

  stack.addOutputs({
    Region: stack.region,
    ImportBucket: importBucket.bucketName,
    Table: table.tableName,
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId || '',
    UserPoolClientId: auth.userPoolClientId,
    SiteUrl: site.url,
  });
}
