import { Inject, Injectable } from "@nestjs/common";
import Tesseract from "tesseract.js";
import {readFile} from 'fs/promises'
import { TESSERRACT_WORKER } from "./constant";
import { join } from "path";

@Injectable()
export class OcrService{
    constructor(@Inject(TESSERRACT_WORKER) private readonly scheduler: Tesseract.Scheduler){}
    async processImage(imageId:string):Promise<any>{
        const image=await readFile(join(process.cwd(),"./src/download.png"));
        const data= await this.scheduler.addJob('recognize',join(process.cwd(),"./src/download.png"));
        console.log(data.data.text);
        return data.data.text;
    }
}