import { Component, OnInit, Input } from '@angular/core';

import { TKartochka } from '../../services/kartochki.service';

@Component({
    selector: 'app-opisanie',
    templateUrl: './opisanie.component.html',
    styleUrls: ['./opisanie.component.scss'],
    standalone: false
})
export class OpisanieComponent implements OnInit {

  constructor() {
}

  @Input() props: TKartochka = {
    authorId: 0,
    author: 'string',
    ​​created: 'string',
    ​​id: 0,
    ​​imageUrl: 'string',
    ​​locationId: 0,
    location: 'string',
    ​​name: 'string'
  };

  ngOnInit(): void {
  }

}
