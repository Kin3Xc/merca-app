import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html'
})
export class FavoritosPage {
	

  constructor(public modal:ModalController) {

  }

}
