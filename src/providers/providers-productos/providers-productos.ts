import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../config/config';

/*
  Generated class for the ProvidersProductosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProvidersProductosProvider {

  constructor(public http: Http) {
  }

  getProductos(id){
  	return this.http.get(`${AppConfig.API_URL}/producto/proveedor/${id}`)
	  .map(res => res.json())
	  .toPromise();
  }

}
