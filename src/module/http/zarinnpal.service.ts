import { HttpService } from '@nestjs/axios';
import { HttpServer, Injectable } from '@nestjs/common';


@Injectable()
export class ZarinnpalService {
constructor(
  private httpService:HttpService,
 
){}

async sendRequest(data?:any){
this.httpService.post(process.env.ZARINNPAL_REQUEST_URL,data)
}

async verifyRequest(data?:any){
this.httpService.post(process.env.ZARINNPAL_VERIFY_URL,data)
}
}
