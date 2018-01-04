import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalMas } from './mas';


@NgModule({
  declarations: [
    ModalMas,
  ],
  imports: [
    IonicPageModule.forChild(ModalMas),
  ],
  exports: [
    ModalMas
  ]
})
export class ModalMasModule {}
