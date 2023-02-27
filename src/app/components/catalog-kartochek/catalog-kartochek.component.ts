import { Component, OnInit } from '@angular/core';

import {
  KartochkiService,
  TDataKartochkas,
  TKartochka,
  TFilters,
  TKeyFilters,
  TValueFilters
} from '../../services/kartochki.service';
import { AuthorsService, TDataAuthors, TAuthor } from '../../services/authors.service';
import { LocationsService, TDataLocations, TLocation } from '../../services/locations.service';

import { TNumeraciya } from '../../ui/numeraciya/numeraciya.component';
import { TSelectItem, TSelectItems } from '../../ui/select/select.component';

@Component({
  selector: 'app-catalog-kartochek',
  templateUrl: './catalog-kartochek.component.html',
  styleUrls: ['./catalog-kartochek.component.scss']
})
export class CatalogKartochekComponent implements OnInit {

  dataAuthors: TAuthor[] = [];
  dataLocations: TLocation[] = [];
  dataKartochkas: TKartochka[] = [];
  dataTotalCount: number = -1;
  dataNumeraciya: TNumeraciya = {
    currentPage: 0,
    minPage: -1,
    maxPage: -1
  };
  filters: TFilters | null = null;

  selectAuthorsItems: TSelectItems = [];
  selectLocationsItems: TSelectItems = [];

  authorsToSelectItems():TSelectItems {
    if (this.dataAuthors.length && this.selectAuthorsItems.length <= 0) {
      this.selectAuthorsItems = this.dataAuthors.map((item:TAuthor)=>{
        const elem: TSelectItem = {
          id: item.id,
          idName: item.name
        };
        return elem;
      });
    }
    return this.selectAuthorsItems;
  }

  locationsToSelectItems():TSelectItems {
    if (this.dataLocations.length && this.selectLocationsItems.length <= 0) {
      this.selectLocationsItems = this.dataLocations.map((item:TLocation)=>{
        const elem: TSelectItem = {
          id: item.id,
          idName: item.location
        };
        return elem;
      });
    }
    return this.selectLocationsItems;
  }

  updateFilter(_name: TKeyFilters, _value: TValueFilters ):boolean {
    if (this.kartochki.updateFilter(_name, _value) ) {
      // Сброс отображения карточек перед закрузкой по фильтру
      this.dataTotalCount = -1;
      this.dataKartochkas = [];
      this.dataNumeraciya = {
        currentPage: 1,
        minPage: 0,
        maxPage: 0
      };

      this.loadDataKartochkas();
      return true;
    }
    return false;
  }

  loadDataKartochkas(): void {
    this.kartochki.loadData((_data:TDataKartochkas)=>{
      if(_data) {
        this.filters = this.kartochki.filters;
        this.dataKartochkas = _data.dataKartochkas;
        this.dataTotalCount = _data.dataTotalCount;
        this.dataNumeraciya = _data.dataNumeraciya;
        this.setAuthorsLocations();
      }
    });
  }

  setAuthors(dataKartochka:TKartochka) {
    if(dataKartochka.authorId && !(dataKartochka.author) && this.dataAuthors && this.dataAuthors.length) {
      const _author = this.dataAuthors.find(item => item.id === dataKartochka.authorId);
      if (_author) {
        dataKartochka.author = _author.name;
      }
    }
  }

  setLocations(dataKartochka:TKartochka) {
    if(dataKartochka.locationId && !(dataKartochka.location) &&
      this.dataLocations && this.dataLocations.length) {
      const _location = this.dataLocations.find(item=> item.id === dataKartochka.​​locationId);
      if (_location) {
        dataKartochka.location = _location.location;
      }
    }
  }

  setAuthorsLocations() {
    this.dataKartochkas.forEach((dataKartochka:TKartochka)=>{
      this.setAuthors(dataKartochka);
      this.setLocations(dataKartochka);
    });
  }

  ngOnInit(): void {

    this.authors.loadData((_data:TDataAuthors)=>{
      if(_data) {
        this.dataAuthors = _data.dataAuthors;
        this.setAuthorsLocations();
      }
    });

    this.locations.loadData((_data:TDataLocations)=>{
      if(_data) {
        this.dataLocations = _data.dataLocations;
        this.setAuthorsLocations();
      }
    });

    this.loadDataKartochkas();

  }

  constructor(
     private authors: AuthorsService,
     private locations: LocationsService,
     private kartochki: KartochkiService
  ){
    this.updateFilter = this.updateFilter.bind(this);
  }

}
