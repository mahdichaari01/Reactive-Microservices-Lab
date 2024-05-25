import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { OcrService } from './ocr.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { createScheduler, createWorker } from 'tesseract.js';
import { TESSERRACT_WORKER } from './constant';


@Module({
  imports: [
    ClientsModule.register([
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
    ]),

  ],
  controllers: [AppController],
  providers: [{
    provide: TESSERRACT_WORKER,
    useFactory: async () => {
      const scheduler = createScheduler();

      const workers=await Promise.all([1,2,3,4].map(_=>createWorker("eng")));

    
      workers.forEach(worker => scheduler.addWorker(worker));
      
      return scheduler;
    }
  }, OcrService],
})
export class AppModule { }
