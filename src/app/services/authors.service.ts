import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';

export type TAuthor = {
  id: number;
  ​​name: string;
};

export type TDataAuthors = {
  dataAuthors: TAuthor[];
};

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private patch_url:string  = "/authors";
  private loading: boolean = false;
  private dataAuthors:  TDataAuthors = {
    dataAuthors: []
  };

  constructor(private loader: LoaderService){}

  loadData(cb: (data:TDataAuthors)=>void ) {
    if (!this.loading) {
      this.loading = true;
      this.loader.loadData<TAuthor[]>(
        this.patch_url,
        (response: {data: TAuthor[];} )=>{
          const dataAuthors: TAuthor[] = [
          {
            "id": 0,
            "name": "All Authors"
          }].concat(response.data);

          this.dataAuthors = {
            dataAuthors: dataAuthors
          };

          cb(this.dataAuthors);
        }
      );
    } else {
      cb(this.dataAuthors);
    }
  }

  getById(id:number, cb: (data:boolean|TAuthor)=>void) {
    let result_data:boolean|TAuthor = false;
    if (this.dataAuthors.dataAuthors.length) {
      this.dataAuthors.dataAuthors.some((dataAuthor:TAuthor)=>{
        if(dataAuthor.id === id) {
          result_data = dataAuthor;
          return true;
        }
        return false;
      });
    }
    if(result_data) {
      cb(result_data);
    } else {
      this.loader.loadData<TAuthor[]>(
        this.patch_url+'?id='+id,
        (response:{data: TAuthor[];})=>{
          if (response.data.length) {
            cb(response.data[0]);
          } else {
            cb(false);
          }
        }
      );
    }
  }

};
