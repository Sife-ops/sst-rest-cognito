export const formatResponse = (c: number, b: unknown) => {
  return {
    statusCode: c,
    body: JSON.stringify(b),
  };
};
