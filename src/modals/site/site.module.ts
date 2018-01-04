import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSite } from './site';


@NgModule({
  declarations: [
    ModalSite,
  ],
  imports: [
    IonicPageModule.forChild(ModalSite),
  ],
  exports: [
    ModalSite
  ]
})
export class ModalClienteModule {}
