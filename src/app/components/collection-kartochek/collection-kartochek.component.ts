import { Component, OnInit } from '@angular/core';

import { TKartochka } from '../../services/kartochki.service';

import { CollectionService } from '../../services/collection.service';
import { VitrinaComponent } from "../vitrina/vitrina.component";
import { ButtonClear } from "src/app/button/button.component";

@Component({
    selector: 'app-collection-kartochek',
    templateUrl: './collection-kartochek.component.html',
    styleUrls: ['./collection-kartochek.component.scss'],
    standalone: true,
    imports: [VitrinaComponent, ButtonClear]
})
export class CollectionKartochekComponent implements OnInit {

  dataKartochkas: TKartochka[] = [];
  dataTotalCount: number = 0;

  constructor(
    private collection: CollectionService
  ) {  }

  ngOnInit(): void {
    this.collection.updateDataKartochkas.subscribe(_dataKartochkas => {
      this.dataKartochkas = this.collection.dataKartochkas();
      this.dataTotalCount = this.dataKartochkas.length;
    });

    this.dataKartochkas = this.collection.dataKartochkas();
    this.dataTotalCount = this.dataKartochkas.length;
  }

}
