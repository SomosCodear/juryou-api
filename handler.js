const AWS = require('aws-sdk');

const handleInvoice = async (event) => {
  const data = JSON.parse(event.body);
  console.log(data);

  // Create publish parameters
  const params = {
    Message: JSON.stringify(data),
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
