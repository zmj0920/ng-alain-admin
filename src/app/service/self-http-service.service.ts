import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class SelfHttpServiceService {

  public restServer:string;
  public http:any;

  constructor(public Http:HttpClient) {
    this.http=Http;
     this.restServer='http://123.57.86.207:8080/';
    //this.restServer='http://localhost:50807/';//api/
   }

   public get(url:string,params?:Object,cb?:Function,options?:Object){//get请求
     let httpParams=new HttpParams();
     console.log("get:start")
     if(params){
        for (const key in params) {
          if(params[key] === false || params[key]){
            httpParams=httpParams.set(key,params[key]);
          }
        }
     }
     this.http.get(this.restServer+url,{ headers: options, params: httpParams})
     .subscribe((res: any) => {
      console.log('get:end', res);
      cb(res);
    })
   }
   public post(url: string, data?: Object, cb?: Function, options?: Object) {//post请求
    console.log('post:start');

    this.http.post(this.restServer+url, data, options)
      .subscribe((res: any) => {
        console.log('post:end', res);
        cb(res);
      });
    }

    public put(url: string, data?: Object, cb?: Function, options?: Object) {//put请求
    console.log('put:start');

    this.http.put(this.restServer+url, data, options)
      .subscribe((res: any) => {
        console.log('put:end', res);
        cb(res);
      });
    }

    public delete(url: string, params?: Object, cb?: Function, options?: Object) {//delete请求
    let httpParams = new HttpParams();
    console.log('delete:start');
    if (params) {
      for (const key in params) {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    this.http.delete(this.restServer+url, { headers: options, params: httpParams })
      .subscribe((res: any) => {
        console.log('delete:end', res);
        cb(res);
      });
    }
}
