const { randomUUID } = require('crypto');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { EventBridgeClient, PutEventsCommand } = require("@aws-sdk/client-eventbridge");

const {Marshaller} = require('./marshaller');

const REGION = 'us-west-2';

const ddbClient = new DynamoDBClient({region: REGION});
const ebClient  = new EventBridgeClient({region: REGION});

const lambdaHandler = async (event) => {
    console.log(event);
    
    const orderId = randomUUID();
    
    const ddbItem = {
        orderId: {S: orderId},
        category: {S: event.detail.category},
        location: {S: event.detail.location},
        value: {N: String(event.detail.value)},
    };
    
    console.log('ddbItem', ddbItem);
    
    const ebEvent = {
        Time: new Date(),
        Source: 'com.aws.forecast',
        Detail: JSON.stringify({ orderId }),
        DetailType: event['detail-type'],
        EventBusName: 'Orders',
    };
    
    console.log('ebEvent', ebEvent);
    
    const ddbResponse = await ddbClient.send(new PutItemCommand({ TableName: 'OrderDetails', Item: ddbItem }));
    
    console.log('ddbResponse', ddbResponse);

    
    const ebResponse = await ebClient.send(new PutEventsCommand({ Entries: [ebEvent] }));
    
    console.log('ebResponse', ebResponse);
    
    /* const [ddbResponse, ebResponse] = await Promise.all([
        ddbClient.send(new PutItemCommand({ TableName: 'OrderDetails', Item: ddbItem })),
        ebClient.send(new PutEventsCommand({ Entries: [ebEvent] }))
    ]); */    
};

module.exports = {
    lambdaHandler
};
