import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export type TFilters = {
  _limit: number;
  _page: number;
  authorId: number;
  locationId: number;
  q: string;
  // created_gte: string;
  // created_lte: string;
};

export type TKeyFilters = keyof TFilters;

export type TValueFilters = number|string;

export type TUpdateFilter = (_n:TKeyFilters, _v:TValueFilters )=>boolean;

export type TKartochka = {
  authorId: number;
  author?: string;

  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  location?: string;
  name: string;
};

export type TDataKartochkas = {
  dataTotalCount: number;
  dataKartochkas: TKartochka[];
  dataNumeraciya: {
    currentPage: number;
    minPage: number;
    maxPage: number;
  }
};

@Injectable({
  providedIn: 'root'
})
export class KartochkiService {

  private patch_url: string = "/paintings";
  private loading: boolean = false; // флаг (метка) чтобы не делать повторный запрос

  private saveData: TDataKartochkas = {
    dataTotalCount: -1,
    dataKartochkas: [],
    dataNumeraciya: {
      currentPage: 1,
      minPage: 0,
      maxPage: 0
    }
  };

  filters : TFilters = {
    _limit: 12,
    _page: 1,
    authorId: 0, // 0 - отсутвие параметра в запросе
    locationId: 0, // 0 - отсутвие параметра в запросе
    q: '', // null или '' - отсутвие параметра в запросе
    // created_gte: '',
    // created_lte: ''
  };

  private needFiltering():boolean {
    return this.filters && (
      this.filters.authorId > 0
      || this.filters.locationId > 0
      || this.filters.q > ''
    );
  }

  constructor(private loader: LoaderService) {
    // Object.assign(this.filters, init_filters);
  }

  updateFilter(_name:TKeyFilters, _value:TValueFilters ):boolean {
    if (_name === null || this.filters[_name] === _value) {
      return false;
    }

    this.loading = false;
    this.filters._page = 1; // Смена настроик всегда приводит в начало списка
    this.filters[_name] = _value as never;

    return true;
  }

  // constructFilters():string {
  //   let _filters: string = '';
  //   let _key: keyof TFilters;
  //   for (_key in this.filters) {
  //     if (this.filters[_key]) {
  //       if (_filters === '') {
  //         _filters =  '?' + _key + "=" +this.filters[_key];
  //       } else {
  //         _filters += "&" + _key + "=" +this.filters[_key];
  //       }
  //     }
  //   }
  //   return _filters;
  // }

  private doFiltering(data:TKartochka[]):TKartochka[] {
    if(data?.length > 0 && this.needFiltering()) {
      return data.filter((_kartochka)=>{
        return (!(this.filters.authorId > 0) || _kartochka.authorId === this.filters.authorId)
          && (!(this.filters.locationId > 0) || _kartochka.locationId === this.filters.locationId)
          && (!(this.filters.q > '') || _kartochka.name.indexOf(this.filters.q) >= 0 );
      });
    }
    return data;
  }

  loadData(cb: (data:TDataKartochkas)=>void) {
    this.loader.paintings().then((response)=>{
      if(response) {
        const data = response as TKartochka[]; // Приводим тип
        const totalCount:number = data.length;
        let maxPage:number = Math.floor(totalCount / this.filters._limit);
        if (totalCount % this.filters._limit > 0) {
          ++maxPage;
        }

        data.forEach((kartochka:TKartochka) => {
          kartochka.imageUrl = this.loader.fullImageUrl(kartochka.imageUrl);
        });

        this.saveData = {
          dataTotalCount: totalCount,
          dataKartochkas: this.doFiltering(data),
          dataNumeraciya: {
            currentPage: this.filters._page,
            minPage: 1,
            maxPage: maxPage
          }
        }
        
        cb(this.saveData);
      }
    })

  }


  // loadData(cb: (data:TDataKartochkas)=>void) {
  //   if (!this.loading) {
  //     this.loading = true;
  //     this.loader.loadData<TKartochka[]>(
  //       this.patch_url+this.constructFilters(),
  //       (response: {data: TKartochka[]; headers: HttpHeaders; } )=>{
  //         const {data} = response;
  //         const totalCount:number = Number(response.headers.get("X-Total-Count"));
  //         let maxPage:number = Math.floor(totalCount / this.filters._limit);

  //         if (totalCount % this.filters._limit > 0) {
  //           ++maxPage;
  //         }

  //         data.forEach((kartochka:TKartochka) => {
  //           kartochka.imageUrl = this.loader.fullImageUrl(kartochka.imageUrl);
  //         });

  //         this.saveData = {
  //           dataTotalCount: totalCount,
  //           dataKartochkas: data,
  //           dataNumeraciya: {
  //             currentPage: this.filters._page,
  //             minPage: 1,
  //             maxPage: maxPage
  //           }
  //         }

  //         cb(this.saveData);
  //       }
  //     );
  //   } else {
  //     cb(this.saveData);
  //   }
  // }

  private getOneBYId(id:number):boolean|TKartochka {
    if (this.saveData.dataKartochkas.length) {
      for(let dataKartochki of this.saveData.dataKartochkas) {
        if(dataKartochki.id === id) {
          return dataKartochki;
        }
      }
    }
    return false;
  }

  getById(id:number, cb: (data:boolean|TKartochka)=>void) {
    id = +id;
    
    if (!(this.saveData.dataKartochkas.length)) {
      this.loadData((data:TDataKartochkas)=>{
        cb(this.getOneBYId(id));
      })
    } else {
      cb(this.getOneBYId(id));
    }
    
    
    
    // let result_data:boolean|TKartochka = false;
    // if (this.saveData.dataKartochkas.length) {
    //   this.saveData.dataKartochkas.some((dataKartochki:TKartochka)=>{
    //     if(dataKartochki.id === id) {
    //       result_data = dataKartochki;
    //       return true;
    //     }
    //     return false;
    //   });
    // }
    // if(result_data) {
    //   cb(result_data)
    // } else {
      // this.loader.loadData<TKartochka[]>(
      //   this.patch_url+'?id='+id,
      //   (response:{data: TKartochka[];})=>{
      //     if (response.data.length) {
      //       result_data = response.data[0];
      //       result_data.imageUrl = this.loader.fullImageUrl(result_data.imageUrl);
      //       cb(result_data);
      //     } else {
      //       cb(false);
      //     }
      //   }
      // );
    // }
  }

};
