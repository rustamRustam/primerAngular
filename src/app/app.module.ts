import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';

import { CollectionService } from './services/collection.service';
import { LoaderService } from './services/loader.service';
import { AuthorsService } from './services/authors.service';
import { LocationsService } from './services/locations.service';
import { KartochkiService } from './services/kartochki.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogKartochekComponent } from './components/catalog-kartochek/catalog-kartochek.component';
import { CollectionKartochekComponent } from './components/collection-kartochek/collection-kartochek.component';
import { KartochekaComponent } from './components/kartocheka/kartocheka.component';
import { KartochekaViewComponent } from './components/kartocheka-view/kartocheka-view.component';
import { LoadingComponent } from './ui/loading/loading.component';
import { NameComponent } from './components/name/name.component';
import { NumeraciyaComponent } from './ui/numeraciya/numeraciya.component';
import { OpisanieComponent } from './components/opisanie/opisanie.component';
import { SelectComponent } from './ui/select/select.component';
import { VitrinaComponent } from './components/vitrina/vitrina.component';
import { ButtonComponent, ButtonAddRemove, ButtonClear } from './button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogKartochekComponent,
    CollectionKartochekComponent,
    KartochekaComponent,
    KartochekaViewComponent,
    LoadingComponent,
    NameComponent,
    NumeraciyaComponent,
    OpisanieComponent,
    SelectComponent,
    VitrinaComponent,
    ButtonComponent,
    ButtonAddRemove,
    ButtonClear
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CollectionService,
    LoaderService,
    AuthorsService,
    KartochkiService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
