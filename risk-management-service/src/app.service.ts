import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async complexCalculation(){
    return new Promise(r=>{setTimeout(()=>r(400),10)})
  }
}
