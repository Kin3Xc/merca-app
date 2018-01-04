import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalMap } from './map';


@NgModule({
  declarations: [
    ModalMap,
  ],
  imports: [
    IonicPageModule.forChild(ModalMap),
  ],
  exports: [
    ModalMap
  ]
})
export class ModalMapModule {}
