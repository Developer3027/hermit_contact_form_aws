// Load the AWS SDK for Node.js
const aws = require('aws-sdk');

// Create a new SES object in ap-south-1 region
var ses = new aws.SES({ region: 'us-east-1' });

const RECEIVE_MAIL = 'hermitplus@test.com';
const SENDER_MAIL = 'dev3027@test.com';

var response = {
  isBase64Encoded: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  statusCode: 200,
  body: '{"result": "Success."}'
};

exports.handler = (event, context, callback) => {
  console.log('Received event:', event);
  sendEmail(event, function (err, data) {
    context.done(err, null);
  });
};

function sendEmail(event, done) {
  var params = {
    Destination: {
      ToAddresses: [RECEIVE_MAIL]
    },
    Message: {
      Body: {
        Text: {
          Data: `
                name: ${event.name}
                email: ${event.email}
                message: ${event.message}
                reason: ${event.reason}`,
          Charset: 'UTF-8'
        }
      },

      Subject: { Data: 'Hermits Contact Form: ' + event.name, Charset: 'UTF-8' }
    },
    Source: SENDER_MAIL
  };
  ses.sendEmail(params, done);
}
