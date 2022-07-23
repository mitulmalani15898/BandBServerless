const aws = require("aws-sdk");

const TableName = "users";
const LoginStatisticsTable = "login_statistics";

exports.handler = async (event) => {
  if (event.body === null || event.body === undefined) {
    const response = {
      statusCode: 400,
      body: JSON.stringify("Please provide proper and valid request body."),
    };
    return response;
  }
  const reqBody = JSON.parse(event.body);

  // Set the region
  aws.config.update({ region: "us-east-1" });

  // Create the DynamoDB service object
  const ddb = new aws.DynamoDB({ apiVersion: "2012-08-10" });

  const getDbItem = async (getParams) => {
    return await new Promise((resolve, reject) => {
      ddb.getItem(getParams, function (err, data) {
        if (err) {
          console.log("Get Item DynamoDB Error", err);
          reject(err);
        } else {
          console.log("Get Item DynamoDB Success", data.Item);
          resolve(data.Item);
        }
      });
    });
  };

  const putDbItem = async (putParams) => {
    return await new Promise((resolve, reject) => {
      ddb.putItem(putParams, function (err, data) {
        if (err) {
          console.log("Put Item DynamoDB Error", err);
          reject(err);
        } else {
          console.log("Put Item DynamoDB Success", data);
          resolve(data);
        }
      });
    });
  };

  switch (reqBody.type) {
    case "save":
      const putParams = {
        TableName,
        Item: {
          userId: { S: reqBody.userId },
          securityQuestion: { S: reqBody.securityQuestion },
          securityAnswer: { S: reqBody.securityAnswer },
          ceasarKey: { N: reqBody.ceasarKey.toString() },
        },
      };
      try {
        await putDbItem(putParams);
        const response = {
          statusCode: 201,
          body: JSON.stringify("Security question answer saved successfully."),
        };
        return response;
      } catch (error) {
        const response = {
          statusCode: 500,
          body: JSON.stringify(
            "Something went wrong, please try again after sometime."
          ),
        };
        return response;
      }

    case "getQuestion":
      const getParams = {
        TableName,
        Key: {
          userId: {
            S: reqBody.userId,
          },
        },
      };
      try {
        const Item = await getDbItem(getParams);
        const response = {
          statusCode: 200,
          body: Item.securityQuestion.S,
        };
        return response;
      } catch (err) {
        const response = {
          statusCode: 404,
          body: JSON.stringify("Not found."),
        };
        return response;
      }

    case "verify":
      const verifyParams = {
        TableName,
        Key: {
          userId: {
            S: reqBody.userId,
          },
        },
      };
      try {
        const Item = await getDbItem(verifyParams);
        let response = {};
        if (Item.securityAnswer.S === reqBody.securityAnswer) {
          response = {
            statusCode: 200,
            body: JSON.stringify("User authenticated successfully."),
          };
        } else {
          response = {
            statusCode: 401,
            body: JSON.stringify("Authentication failed, please try again."),
          };
        }
        return response;
      } catch (err) {
        const response = {
          statusCode: 404,
          body: JSON.stringify("Not found."),
        };
        return response;
      }

    case "loginSuccess":
      const loginPutParams = {
        TableName: LoginStatisticsTable,
        Item: {
          userId: { S: reqBody.userId },
          firstName: { S: reqBody.firstName },
          lastName: { S: reqBody.lastName },
          email: { S: reqBody.email },
          timestamp: { S: reqBody.timestamp },
        },
      };
      try {
        await putDbItem(loginPutParams);
        const response = {
          statusCode: 201,
          body: JSON.stringify(
            "Login success attempt record saved successfully."
          ),
        };
        return response;
      } catch (error) {
        const response = {
          statusCode: 500,
          body: JSON.stringify(
            "Something went wrong, please try again after sometime."
          ),
        };
        return response;
      }

    default:
      const response = {
        statusCode: 200,
        body: JSON.stringify("Hello from Authentication Lambda!"),
      };
      return response;
  }
};
