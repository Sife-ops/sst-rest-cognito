import dynamoose from "dynamoose";

export default new dynamoose.Schema({
  pk: {
    type: String,
    hashKey: true,
  },
  sk: {
    type: String,
    rangeKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});