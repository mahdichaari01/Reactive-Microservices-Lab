import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [  ClientsModule.register([
    {
      name: 'OCR_SERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'OCR',
          brokers: ['localhost:9092'],
          
        },
        consumer: {
          groupId: 'ocr-consumer',
        }
      
      }
    },
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
