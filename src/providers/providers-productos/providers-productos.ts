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

  getProductos(id, section){
  	return this.http.get(`${AppConfig.API_URL}/producto/proveedor/${id}/section/${section}`)
	  .map(res => res.json())
	  .toPromise();
  }

  getSections(proveedor){
    return this.http.get(`${AppConfig.API_URL}/section/proveedor/${proveedor}`)
	  .map(res => res.json())
	  .toPromise();
  }

}
