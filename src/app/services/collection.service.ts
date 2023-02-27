import { Injectable } from '@angular/core'
import { Subject } from 'rxjs';

import { TKartochka } from './kartochki.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService extends Map<number,TKartochka> {

  private count:number;

  public updateDataKartochkas;

  constructor() {
    super();
    this.count = 0;
    this.updateDataKartochkas = new Subject();

    if(localStorage.hasOwnProperty('angular_collection')) {
      const _data = localStorage.getItem('angular_collection');
      if (_data && _data != 'undefined') {
        const json_data = JSON.parse(_data);

        for( let id in json_data ){
          const kartochka:TKartochka = json_data[id];
          super.set(kartochka.id, kartochka);
        }
      }
    }

  }

  saveToLocalStorage() {
    localStorage.setItem(
      'angular_collection',
      JSON.stringify(Object.fromEntries(this.entries()))
    );

    this.updateDataKartochkas.next(this);
  }

  override set(id:number, data:TKartochka):this {
    if (!super.has(id)) {
      if (this.size < 10) {
        super.set(id, data);
        this.saveToLocalStorage();
        ++this.count;
      }
    }
    return this;
  }

  override delete(id:number):boolean {
    const result:boolean = super.delete(id);
    this.saveToLocalStorage();
    --this.count;
    return result;
  }

  override has(id:number) {
    return super.has(id);
  }

  override clear() {
    super.clear();
    this.saveToLocalStorage();
    this.count = 0;
  }

  dataKartochkas() {
    let result:TKartochka[] = [];
    for (let data of this.values()) {
      result.push(data);
    }
    return result;
  }

};
