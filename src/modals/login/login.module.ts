import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLogin } from './login';


@NgModule({
  declarations: [
    ModalLogin,
  ],
  imports: [
    IonicPageModule.forChild(ModalLogin),
  ],
  exports: [
    ModalLogin
  ]
})
export class ModalLoginModule {}
