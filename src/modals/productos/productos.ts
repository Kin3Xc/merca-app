import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ProductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {

 
  public pet: string = "filter";
  public data:any;

  constructor(private navParams: NavParams, private view: ViewController) {

  }

  ionViewWillLoad() {
    this.data = this.navParams.get('data');
  }

  closeModal(){
  	this.view.dismiss();
  }

}
