import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalMas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'modal-mas',
  templateUrl: 'mas.html',
})
export class ModalMas {
  public name:string;
  public producto: any;
  
  constructor(private view: ViewController, private navParams: NavParams) {
  }

  ionViewWillLoad() {
    this.producto = this.navParams.get('producto');
    console.log(this.producto);
  }

  closeModal(){
  	this.view.dismiss();
  }

}
