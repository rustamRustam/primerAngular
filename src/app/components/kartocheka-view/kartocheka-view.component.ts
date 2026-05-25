import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { KartochkiService, TKartochka } from '../../services/kartochki.service';
import { AuthorsService, TAuthor } from '../../services/authors.service';
import { LocationsService } from '../../services/locations.service';
import { Subscription } from 'rxjs';
import { OpisanieComponent } from "../opisanie/opisanie.component";
import { ButtonAddRemove } from "src/app/button/button.component";

@Component({
    selector: 'app-kartocheka-view',
    templateUrl: './kartocheka-view.component.html',
    styleUrls: ['./kartocheka-view.component.scss'],
    standalone: true,
    imports: [OpisanieComponent, ButtonAddRemove]
})
export class KartochekaViewComponent implements OnInit, OnDestroy {

  private _dataKartocheka = signal<TKartochka | undefined>(undefined);
  set dataKartocheka(value:TKartochka) {
    this._dataKartocheka.set(value);
  }
  get dataKartocheka():TKartochka | undefined {
    return this._dataKartocheka();
  }
  // private subscription: Subscription
  
  @Input() id:number = 0;

  private subscription: Subscription | undefined;
  constructor(private activateRoute: ActivatedRoute,
              private authors:AuthorsService,
              private locations:LocationsService,
              private kartochki:KartochkiService
  ) {
    this.id = this.activateRoute.snapshot.params['id'];

    this.subscription = this.activateRoute.params.subscribe(
      (params) => {
        if(params['id']) {
          this.id = +params['id'];
          this.loadDataKartocheka();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadDataKartocheka() {
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

  ngOnInit(): void {
    this.loadDataKartocheka();
  }

}
