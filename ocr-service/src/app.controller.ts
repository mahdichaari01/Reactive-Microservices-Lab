import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { OcrDocument } from './types/ocr.types';
import { OcrService } from './ocr.service';

@Controller()
export class AppController {
  constructor(@Inject('OCR_SERVICE') private readonly client: ClientProxy, private readonly ocrService: OcrService) { }

  @EventPattern('ocr')
  async handleOCR(data: OcrDocument) {
    console.log('Received data:', data);
    const result = await this.ocrService.processImage(data.id);
    this.client.emit("ocr-ready", JSON.stringify(
      {
        id: data.id,
        data: result
      }
    ));
  }
}
