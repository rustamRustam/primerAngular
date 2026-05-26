import { Component, Input, signal } from '@angular/core';
import { TSelectItems } from '../../ui/select/select.component';
import { TUpdateFilter, TKeyFilters } from '../../services/kartochki.service';

@Component({
  selector: 'app-select-checkbox',
  templateUrl: './select-checkbox.component.html',
  styleUrls: ['./select-checkbox.component.css'],
  standalone: true,
})
export class SelectCheckboxComponent {
  @Input() disabled: boolean = false;
  @Input() current: number = -1;

  @Input() title: string = '';
  
  private _variants = signal<TSelectItems | undefined>(undefined);
  @Input() set variants(value:TSelectItems) {
    this._variants.set(value);
  }
  get variants():TSelectItems | undefined {
    return this._variants();
  }
  
  @Input() updateFilter: TUpdateFilter | null = null;
  @Input() nameFilter: TKeyFilters | null = null;

  constructor() { }

  onCheckboxChange(value: number,checked:boolean): void {
    if (this.updateFilter && this.nameFilter !== null) {
      if(checked) {
        this.updateFilter(this.nameFilter, value);
      } else {
        this.updateFilter(this.nameFilter, 0);
      }
    }
  }
}
