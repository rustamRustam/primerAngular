import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CatalogKartochekComponent } from './components/catalog-kartochek/catalog-kartochek.component';
import { CollectionKartochekComponent } from './components/collection-kartochek/collection-kartochek.component';
import { KartochekaViewComponent } from './components/kartocheka-view/kartocheka-view.component';

const routes: Routes = [
  { path: '', component: CatalogKartochekComponent},
  { path: 'collection', component: CollectionKartochekComponent},
  { path: 'kartochka/:id', component: KartochekaViewComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
