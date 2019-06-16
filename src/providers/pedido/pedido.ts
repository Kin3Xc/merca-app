import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../config/config';

/*
  Generated class for the PedidoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PedidoProvider {

  constructor(public http: Http) {
  }

  sendPedido(pedido){
  	return this.http.post(`${AppConfig.API_URL}/pedido`, pedido)
	  .map(res => res.json())
	  .toPromise();
  }

}
