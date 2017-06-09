import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindPromotiosPage } from './find-promotios';

@NgModule({
  declarations: [
    FindPromotiosPage,
  ],
  imports: [
    IonicPageModule.forChild(FindPromotiosPage),
  ],
  exports: [
    FindPromotiosPage
  ]
})
export class FindPromotiosPageModule {}
