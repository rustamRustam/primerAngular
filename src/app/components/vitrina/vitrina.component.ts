import { Component, OnInit, Input } from '@angular/core';

import { TKartochka } from '../../services/kartochki.service';

@Component({
  selector: 'app-vitrina',
  templateUrl: './vitrina.component.html',
  styleUrls: ['./vitrina.component.scss']
})
export class VitrinaComponent implements OnInit {

  constructor() { }

  @Input() dataTotalCount: number = -1;
  @Input() dataKartochkas: TKartochka[] = [];
  @Input() emltyText: string = "Не найдено ни одной картины!";

  ngOnInit(): void {
  }

}
