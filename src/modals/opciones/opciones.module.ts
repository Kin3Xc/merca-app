import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalOpciones } from './opciones';


@NgModule({
  declarations: [
    ModalOpciones,
  ],
  imports: [
    IonicPageModule.forChild(ModalOpciones),
  ],
  exports: [
    ModalOpciones
  ]
})
export class ModalOpcionesModule {}
