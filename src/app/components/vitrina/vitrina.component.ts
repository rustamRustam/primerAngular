import { Component, OnInit, Input } from '@angular/core';

import { TKartochka } from '../../services/kartochki.service';
import { LoadingComponent } from "src/app/ui/loading/loading.component";
import { KartochekaComponent } from "../kartocheka/kartocheka.component";

@Component({
    selector: 'app-vitrina',
    templateUrl: './vitrina.component.html',
    styleUrls: ['./vitrina.component.scss'],
    standalone: true,
    imports: [LoadingComponent, KartochekaComponent]
})
export class VitrinaComponent implements OnInit {

  constructor() { }

  @Input() dataTotalCount: number = -1;
  @Input() dataKartochkas: TKartochka[] | undefined = [];
  @Input() emltyText: string = "Не найдено ни одной картины!";

  ngOnInit(): void {
  }

}
