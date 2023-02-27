import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type TResultResponse<T> = {data: T; headers: HttpHeaders; };
export type TFuncResponse<T> = (_r:TResultResponse<T> )=>void;

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private baseUrl:string = "https://test-front.framework.team";

  constructor(private http: HttpClient){}

  fullImageUrl(path_imageUrl:string):string {
    return this.baseUrl + path_imageUrl;
  }

  loadData<T>(path_rl:string, cb:TFuncResponse<T>) {
    this.http
      .get(this.baseUrl+path_rl, {observe: 'response'})
      .subscribe({
        next:(response:any) => {
          cb({data:response.body, headers: response.headers});
        }
      });
  }

};
