import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,@Inject('OCR_SERVICE') private readonly client:ClientProxy) {}

  @EventPattern('request-final-score')
  async handleFinalScoreRequest(data:Record<string,unknown>){
    console.log('Received data:',data);
    this.client.emit('ocr',data);
  }
  

  @EventPattern('ocr-ready')
  async handleOCRReply(data:Record<string,unknown>){
    console.log('Received data:',data);
    this.client.emit('final-score','OCR Processed');
  }
}
