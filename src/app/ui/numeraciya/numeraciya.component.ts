import { Component, OnInit, Input } from '@angular/core';

import { TUpdateFilter } from '../../services/kartochki.service';

export type TNumeraciya = {
  currentPage:number;
  minPage:number;
  maxPage:number;
};

@Component({
  selector: 'app-numeraciya',
  templateUrl: './numeraciya.component.html',
  styleUrls: ['./numeraciya.component.scss']
})
export class NumeraciyaComponent implements OnInit {
  private _dataNumeraciya: TNumeraciya = {
    currentPage: 0,
    minPage: -1,
    maxPage: -1
  };

  private _start_num:[string,number][] = [];
  private _end_num:[string,number][] = [];

  @Input() updateFilter:TUpdateFilter | null = null;
  @Input() set dataNumeraciya(valueNumeraciya: TNumeraciya) {
    this._dataNumeraciya = valueNumeraciya;

    if (!this.is_empty()) {
      this._start_num = [
        ["«",valueNumeraciya.minPage],
        ["‹",valueNumeraciya.currentPage-1]
      ];

      this._end_num = [
        ["›",valueNumeraciya.currentPage+1],
        ["»",valueNumeraciya.maxPage]
      ];
    }
  }

  constructor() { }

  ngOnInit(): void { }

  get dataNumeraciya() {
    return this._dataNumeraciya;
  }

  get start_num(){return this._start_num;}
  get end_num(){return this._end_num;}

  counter():number[] {
    let array_pages:number[] = [];
    for (let i = this._dataNumeraciya.minPage; i <= this._dataNumeraciya.maxPage; ++i) {
      array_pages.push(i)
    }
    return array_pages;
  }

  is_empty():boolean {
    const _dNumeraciya = this.dataNumeraciya;
    return (_dNumeraciya.currentPage === 0 ||
      _dNumeraciya.minPage <= 0 &&
      _dNumeraciya.maxPage <= 0);
  }

  changeCurrentPage(_currentPage:number) {
    if (this.updateFilter) {
      this.updateFilter('_page', _currentPage);
    }
  }

}
