import { Component, OnInit, Input } from '@angular/core';

import { TKartochka } from '../../services/kartochki.service';
import { ButtonAddRemove } from "src/app/button/button.component";
import { OpisanieComponent } from "../opisanie/opisanie.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-kartocheka',
    templateUrl: './kartocheka.component.html',
    styleUrls: ['./kartocheka.component.scss'],
    standalone: true,
    imports: [ButtonAddRemove, OpisanieComponent, RouterModule]
})
export class KartochekaComponent implements OnInit {

  @Input() dataKartocheka: TKartochka = {
    "authorId": -1,
    "created": "",
    "id": -1,
    "imageUrl": "",
    "locationId": -1,
    "name": ""
  };

  constructor() { }

  ngOnInit(): void {
  }

}
