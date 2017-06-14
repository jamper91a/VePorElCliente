import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapOfferPage } from './map-offer';

@NgModule({
  declarations: [
    MapOfferPage,
  ],
  imports: [
    IonicPageModule.forChild(MapOfferPage),
  ],
  exports: [
    MapOfferPage
  ]
})
export class MapOfferPageModule {}
