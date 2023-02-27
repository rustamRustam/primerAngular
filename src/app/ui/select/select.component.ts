import { Component, OnInit, Input } from '@angular/core';

import { TAuthor } from '../../services/authors.service';
import { TLocation } from '../../services/locations.service';
import { TUpdateFilter, TKeyFilters } from '../../services/kartochki.service';

export type TSelectItem = {
  id: number;
  idName: string;
}
export type TSelectItems = TSelectItem[];


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  is_open:boolean = false;

  @Input() disabled:boolean = false;
  @Input() current:number = -1;
  @Input() variants: TSelectItems = [];
  @Input() updateFilter:TUpdateFilter | null = null;
  @Input() nameFilter: TKeyFilters | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  getCurrentNameValue(curId:number):string {
    let current_value:TSelectItem = {
      id: -1,
      idName: ''
    };

    this.variants.some((item:TSelectItem) => {
      if(item !== null && item.id === curId) {
        current_value = item;
        return true;
      }
      return false;
    });

    if (current_value.id !== -1) {
      return current_value.idName;
    }
    return "Ups Ошибка";
  }

  blurFocusOut() {
    this.is_open = false
  }

  clickOnSelectButton() {
    this.is_open = !this.is_open;
  }

  clickOnSelectVariant(_current:number) {
    if(this.updateFilter && this.nameFilter !== null) {
      this.updateFilter(this.nameFilter, _current);
    }
    this.is_open = false;
  }

}
