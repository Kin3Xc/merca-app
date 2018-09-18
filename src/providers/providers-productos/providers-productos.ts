import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ProvidersProductosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProvidersProductosProvider {
  API_URL:string;
  constructor(public http: Http) {
    this.API_URL = "http://localhost:5434/api/v1";
  }

  getProductos(id){
  	return this.http.get(this.API_URL+'/producto/proveedor/'+id)
	  .map(res => res.json())
	  .toPromise();
  }

}
