import * as AWS from "aws-sdk";
enum RouteKeys {
  GET_USERS = "GET /users",
  GET_USER = "GET /users/{userId}",
  PUT_USER = "PUT /users/{userId}",
  DELETE_USER = "DELETE /users/{userId}",
}

exports.handler = async (
  event,
  context
): Promise<{ statusCode: number; body: any }> => {
  console.info(event);
  const routeKey = event.routeKey;
  switch (routeKey) {
    case RouteKeys.GET_USERS: {
      var docClient = new AWS.DynamoDB.DocumentClient();
      const result = await docClient.scan({ TableName: "Users" }).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({
          users: result.Items,
        }),
      };
    }

    case RouteKeys.GET_USER: {
      var docClient = new AWS.DynamoDB.DocumentClient();
      const userId = event.pathParameters.userId;
      const result = await docClient
        .get({ TableName: "Users", Key: { id: userId } })
        .promise();

      if (result && result.Item) {
        return {
          statusCode: 200,
          body: JSON.stringify(result.Item),
        };
      }

      return {
        statusCode: 404,
        body: null,
      };
    }

    case RouteKeys.PUT_USER: {
      var docClient = new AWS.DynamoDB.DocumentClient();
      const userId = event.pathParameters.userId;
      const user = JSON.parse(Buffer.from(event.body, "base64").toString());
      await docClient
        .put({ TableName: "Users", Item: { id: userId, ...user } })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify(""),
      };
    }

    case RouteKeys.DELETE_USER: {
      var docClient = new AWS.DynamoDB.DocumentClient();
      const userId = event.pathParameters.userId;
      await docClient
        .delete({ TableName: "Users", Key: { id: userId } })
        .promise();

      return {
        statusCode: 200,
        body: JSON.stringify(""),
      };
    }
  }
};

export default exports.handler;
