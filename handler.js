const AWS = require('aws-sdk');
const snakecaseKeys = require('snakecase-keys');

const handleInvoice = async (event) => {
  const data = JSON.parse(event.body);
  console.log(data);

  const message = snakecaseKeys(data);
  const params = {
    Message: JSON.stringify(message),
    TopicArn: process.env.SNS_ARN,
  };

  console.log('Sending message to sns');
  console.log(params);
  const sns = new AWS.SNS();
  const snsResponse = await sns.publish(params).promise();
  console.log('Success!');
  console.log(snsResponse);

  return {
    statusCode: 200,
    body: '',
  };
};

module.exports = {
  handleInvoice,
};
