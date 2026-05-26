import { Component, OnInit, Input, signal } from '@angular/core';
import { TKartochka } from '../../services/kartochki.service';
import { ButtonAddRemove } from "src/app/button/button.component";
import { OpisanieComponent } from "../opisanie/opisanie.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-kartocheka',
    templateUrl: './kartocheka.component.html',
    styleUrls: ['./kartocheka.component.scss'],
    standalone: true,
    imports: [ButtonAddRemove, OpisanieComponent, RouterLink]
})
export class KartochekaComponent implements OnInit {
  private _loadedImg = signal<number>(0);// 0 - не бюыло загрузки 1 - загрузили -1 - ошибка
  @Input() set loadedImg(value:number) {
    this._loadedImg.set(value);
  }
  get loadedImg():number {
    return this._loadedImg();
  }
  
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
