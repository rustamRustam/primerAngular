import { Component, Input, OnInit } from '@angular/core';

import { TUpdateFilter } from '../../services/kartochki.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {

  @Input() disabled:boolean = false;
  @Input() value:string ="";
  @Input() updateFilter:TUpdateFilter | null = null;

  onChangedValue(event: Event) {
    if(event.target && this.updateFilter) {
      const input = event.target as HTMLInputElement;
      const value:string = input.value;
      this.updateFilter('q', value);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
