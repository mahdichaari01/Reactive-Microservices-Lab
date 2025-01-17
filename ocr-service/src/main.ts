import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
      
        client: {
          brokers: ['localhost:9092'],
          clientId: 'OCR', 
        }
        ,
        consumer: {
          groupId: 'ocr-consumer',
          
        },
        producer:{
          idempotent: true,
          allowAutoTopicCreation: true,
          
        },
        subscribe:{
          fromBeginning: true,
        }
      
      }
    },
  );
  await app.listen();

}
bootstrap();
