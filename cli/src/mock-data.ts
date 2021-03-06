import AWS from 'aws-sdk';
import crypto from 'crypto';
import { faker } from '@faker-js/faker';

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

interface Category {
  sk: string;
  name: string;
}

const pickCategories = (c: Category[]): Category[] => {
  const length = c.length;
  // todo: no - 1?
  const tries = faker.datatype.number(length);
  const picked: Category[] = [];
  let i = 0;
  while (i < tries) {
    const index = faker.datatype.number(length - 1);
    const pick = c[index];
    // if (picked.includes(pick)) {
    if (picked.find((e) => e.name === pick.name)) {
      continue;
    } else {
      picked.push(pick);
      i++;
    }
  }
  return picked;
};

const mockUser = (pk: string) => {
  /**
   * categories
   */

  const categoriesMax = faker.datatype.number({ min: 1, max: 10 });
  let categories: Category[] = [];
  for (let i = 0; i < categoriesMax; i++) {
    categories.push({
      sk: `Category:${crypto.randomUUID()}`,
      name: faker.word.noun(),
    });
  }

  // todo: make dry
  categories.map((e) => {
    dynamodb
      .put({
        Item: {
          pk,
          sk: e.sk,
          name: e.name,
          description: faker.lorem.sentence(),
        },
        // todo: read table name from environment
        TableName: 'dev-sst-rest-cognito-table',
      })
      .promise()
      .then((data) => console.log(data))
      .catch(console.error);
  });

  const bookmarksMax = faker.datatype.number({ min: 1, max: 20 });
  for (let i = 0; i < bookmarksMax; i++) {
    const favorite = faker.datatype.number({ min: 1, max: 100 }) < 33;
    const sk = `Bookmark:${crypto.randomUUID()}`;
    dynamodb
      .put({
        Item: {
          pk,
          sk,
          name: faker.word.noun(),
          description: faker.lorem.sentence(),
          url: faker.internet.url(),
          favorite,
        },
        TableName: 'dev-sst-rest-cognito-table',
      })
      .promise()
      .then((data) => console.log(data))
      .catch(console.error);

    pickCategories(categories).map((e) => {
      dynamodb
        .put({
          Item: {
            pk,
            // sk: `${sk}#${e.sk}`,
            // category: e.sk,
            sk: `${e.sk}#${sk}`,
            bookmark: sk,
          },
          TableName: 'dev-sst-rest-cognito-table',
        })
        .promise()
        .then((data) => console.log(data))
        .catch(console.error);
    });
  }
};

const main = () => {
  const pks = ['User:054661142656'];
  pks.map((e) => {
    mockUser(e);
  });
};

main();
