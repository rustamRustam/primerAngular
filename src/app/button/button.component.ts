import { Component, OnInit, Input } from '@angular/core';

import { CollectionService } from '../services/collection.service';
import { TKartochka } from '../services/kartochki.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() dopClass: string = '';
  @Input() title: string = 'Title';

  constructor() { }

  ngOnInit(): void { }

  clickOnButton(event:Event) {
    // console.log('ButtonComponent Click');
  }

}

@Component({
  selector: 'app-button_add_remove',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonAddRemove extends ButtonComponent {

  @Input() id: number = -1;
  @Input() dataKartocheka: TKartochka = {
    "authorId": -1,
    "created": "",
    "id": -1,
    "imageUrl": "",
    "locationId": -1,
    "name": ""
  };

  private setClassTitle() {
    if(this.collection.has(this.id)) {
      this.dopClass = "button-remove";
      this.title = "Из коллекции";
    } else {
      this.dopClass = "button-add";
      this.title = "В коллекцию";
    }
  }

  constructor(private collection: CollectionService) {
    super();
    this.setClassTitle();
  }

  override clickOnButton(event:Event) {
    if(this.collection.has(this.id)) {
      this.collection.delete(this.id);
    } else {
      this.collection.set(this.id, this.dataKartocheka);
    }

    this.setClassTitle();

    super.clickOnButton(event);
  }

  override ngOnInit(): void {
    this.setClassTitle();
    super.ngOnInit();
  }

}


@Component({
  selector: 'app-button_clean',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']

})
export class ButtonClear extends ButtonComponent {

  constructor(private collection: CollectionService) {
    super();
    this.dopClass = "button-clean";
    this.title = "Очистить коллекцию";
  }

  override clickOnButton(event:Event) {
    this.collection.clear();
    super.clickOnButton(event);
  }

}
