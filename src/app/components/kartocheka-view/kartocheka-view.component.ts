import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { KartochkiService, TKartochka } from '../../services/kartochki.service';
import { AuthorsService, TAuthor } from '../../services/authors.service';
import { LocationsService } from '../../services/locations.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-kartocheka-view',
  templateUrl: './kartocheka-view.component.html',
  styleUrls: ['./kartocheka-view.component.scss']
})
export class KartochekaViewComponent implements OnInit {

  dataKartocheka:TKartochka | null = null;
  // private subscription: Subscription
  
  @Input() id:number = 0;

  constructor(private activateRoute: ActivatedRoute,
              private authors:AuthorsService,
              private locations:LocationsService,
              private kartochki:KartochkiService
  ) {
    this.id = this.activateRoute.snapshot.params['id'];

    // this.subscription = this.activateRoute.params.subscribe(
    //   (params) => (this.id = params['id'])
    // )
  }

  ngOnInit(): void {
    if (this.id) {
      this.kartochki.getById(
        this.id,
        (dataKartochki)=>{
          if(dataKartochki && typeof dataKartochki === "object") {
            this.authors.getById(
              dataKartochki.authorId,
              (dataAuthor)=>{
                if(dataAuthor && typeof dataAuthor === "object") {
                  dataKartochki.author = dataAuthor.name;
                  this.locations.getById(
                    dataKartochki.locationId,
                    (dataLocation)=>{
                      if(dataLocation && typeof dataLocation == "object"){
                        dataKartochki.location = dataLocation.location;
                        this.dataKartocheka = dataKartochki;
                      }
                    }
                  )
                }
              }
            );
          }
        }
      );
    }
  }

}
