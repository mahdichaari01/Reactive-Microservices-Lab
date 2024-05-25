import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'demo',
    brokers: ['localhost:9092'],
    logCreator: logLevel => ({ namespace, level, label, log }) => {}
});

function formatLog(queueName, message) {
    console.log(`[${queueName}] ${message}`);
}

async function consumer() {
    const consumer = kafka.consumer({
        groupId: 'demo',
        allowAutoTopicCreation: true,
        sessionTimeout: 30000,
    });

    await consumer.connect();
    await consumer.subscribe({ topic: 'ocr', fromBeginning: false });
    await consumer.subscribe({ topic: 'ocr-ready', fromBeginning: false });
    await consumer.subscribe({ topic: 'final-score', fromBeginning: false });
    await consumer.subscribe({ topic: 'request-final-score', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const logMessage = {
                key: message.key ? message.key.toString() : null,
                value: message.value.toString(),
                headers: message.headers,
            };
            formatLog(topic, JSON.stringify(logMessage));
        },
    });
}

async function producer() {
    const producer = kafka.producer({
        allowAutoTopicCreation: true,
    });

    await producer.connect();
    await producer.send({
        topic: 'request-final-score',
        messages: [
            { value: 'Hello KafkaJS Mahdi! ' + Math.random() },
        ],
    });
}

async function run() {
    console.log('Running consumer...');
    await consumer();

    console.log('Producing Message for request-final-score topic');
    await producer();
}

// Run the main function
run().catch(console.error);
